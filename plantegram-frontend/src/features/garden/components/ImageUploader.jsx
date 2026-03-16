import { useState, useRef, useCallback } from "react";
import { acceptedImageFormats } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSavedPlant } from "../../plants/savedPlantsSlice";
import { identifyPlant } from "../gardenBoardSlice";

const formatSize = (bytes) => {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function ImageUploader() {
	const [files, setFiles] = useState([]);
	const [dragging, setDragging] = useState(false);
	const [error, setError] = useState("");
	const inputRef = useRef(null);
	const dragCounter = useRef(0);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const emailId = useSelector((state) => state.user.emailId);

	const addFiles = useCallback((incoming) => {
		setError("");
		const valid = [];
		const invalid = [];
		Array.from(incoming).forEach((f) => {
			if (!acceptedImageFormats.includes(f.type)) {
				invalid.push(f.name);
				return;
			}
			if (f.size > 5 * 1024 * 1024) {
				invalid.push(`${f.name} (too large)`);
				return;
			}
			valid.push({
				file: f,
				id: `${f.name}-${Date.now()}-${Math.random()}`,
				preview: URL.createObjectURL(f),
				progress: 0,
				done: false,
			});
		});
		if (invalid.length) setError(`Skipped: ${invalid.join(", ")}`);
		if (!valid.length) return;
		setFiles((prev) => [...prev, ...valid]);
		valid.forEach(({ id }) => {
			let p = 0;
			const tick = setInterval(() => {
				p += Math.random() * 18 + 4;
				if (p >= 100) {
					p = 100;
					clearInterval(tick);
				}
				setFiles((prev) =>
					prev.map((f) =>
						f.id === id
							? { ...f, progress: Math.min(p, 100), done: p >= 100 }
							: f,
					),
				);
			}, 120);
		});
	}, []);

	const onDrop = (e) => {
		e.preventDefault();
		dragCounter.current = 0;
		setDragging(false);
		addFiles(e.dataTransfer.files);
	};

	const onDragEnter = (e) => {
		e.preventDefault();
		dragCounter.current++;
		setDragging(true);
	};

	const onDragLeave = (e) => {
		e.preventDefault();
		dragCounter.current--;
		if (dragCounter.current === 0) setDragging(false);
	};

	const removeFile = (id) => {
		setFiles((prev) => {
			const f = prev.find((f) => f.id === id);
			if (f) URL.revokeObjectURL(f.preview);
			return prev.filter((f) => f.id !== id);
		});
	};

	const clearAll = () => {
		files.forEach((f) => URL.revokeObjectURL(f.preview));
		setFiles([]);
		setError("");
	};

	const handlePlantIdentification = async () => {
		try {
			const identifiedPlant = await dispatch(
				identifyPlant({ files, emailId }),
			).unwrap();
			dispatch(addSavedPlant(identifiedPlant));
			navigate(`/plants/${identifiedPlant._id}`);
		} catch (err) {
			console.error("Plant identification failed", err);
		}
	};

	return (
		<div className='flex items-center justify-start font-sans'>
			{/* Card */}
			<div className=' bg-card w-full  rounded-2xl p-14  border border-[rgba(180,200,140,0.3)] backdrop-blur-sm mx-auto'>
				{/* Header */}
				<div className='flex items-start justify-between mb-8'>
					<div>
						<h1 className='font-serif text-[2.1rem] text-[#2d3a22] leading-tight'>
							Upload <em className='italic text-[#6a9a54]'>Plant</em> Images
						</h1>
						<p className='text-sm text-[#8a9a78] mt-1.5 font-light tracking-wide'>
							Drag & drop or browse · up to 5 MB each
						</p>
					</div>
				</div>

				{/* Drop Zone */}
				<div
					className={`border-2 border-dashed rounded-[20px] px-6 py-12 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-300
						${
							dragging
								? "border-solid border-[#5a9e3c] bg-[rgba(200,235,180,0.45)] scale-[1.012] "
								: "border-[#b8d4a0] bg-[rgba(240,248,230,0.4)] hover:border-[#7ab85c] hover:bg-[rgba(220,240,205,0.45)] hover:scale-[1.005]"
						}`}
					onDragEnter={onDragEnter}
					onDragOver={(e) => e.preventDefault()}
					onDragLeave={onDragLeave}
					onDrop={onDrop}
					onClick={() => inputRef.current?.click()}>
					<input
						ref={inputRef}
						type='file'
						accept={acceptedImageFormats.join(",")}
						multiple
						hidden
						onChange={(e) => addFiles(e.target.files)}
					/>

					{/* Icon Circle */}
					<div
						className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-lg transition-transform duration-300
						${
							dragging
								? "bg-gradient-to-br from-[#bde6a0] to-[#8ec870] scale-[1.18] -rotate-[8deg]"
								: "bg-gradient-to-br from-[#d4edbe] to-[#b8d4a0] hover:scale-110 hover:-rotate-[4deg]"
						}`}>
						{dragging ? (
							<svg width='36' height='36' viewBox='0 0 36 36' fill='none'>
								<path
									d='M18 6 L18 26 M10 18 L18 26 L26 18'
									stroke='#3a7a28'
									strokeWidth='2.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						) : (
							<svg width='36' height='36' viewBox='0 0 36 36' fill='none'>
								<rect
									x='5'
									y='8'
									width='26'
									height='20'
									rx='4'
									stroke='#5a9e3c'
									strokeWidth='2'
									fill='none'
								/>
								<circle cx='13' cy='16' r='3' fill='#a3d48a' />
								<path
									d='M5 24 L11 18 L17 22 L23 15 L31 24'
									stroke='#5a9e3c'
									strokeWidth='1.8'
									strokeLinecap='round'
									strokeLinejoin='round'
									fill='none'
								/>
								<path
									d='M22 5 L22 13 M18 9 L22 5 L26 9'
									stroke='#7ab85c'
									strokeWidth='1.8'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						)}
					</div>

					<p className='font-serif text-xl text-[#3a4d2a] mb-1.5'>
						{dragging ? "Release to drop your images" : "Drop your images here"}
					</p>
					<p className='text-[0.82rem] text-[#96a882] mb-5'>
						JPG, PNG, WebP, GIF, SVG supported
					</p>

					<button
						className='bg-[#4a7c3f] text-white border-none rounded-full px-7 py-2.5 text-sm font-medium cursor-pointer tracking-wide transition-all duration-200 shadow-lg hover:bg-[#3b6432] hover:-translate-y-px hover:shadow-xl active:translate-y-0'
						onClick={(e) => {
							e.stopPropagation();
							inputRef.current?.click();
						}}>
						Browse files
					</button>

					<div className='flex gap-2 flex-wrap justify-center mt-5'>
						{["JPG", "PNG", "WebP", "GIF", "SVG"].map((f) => (
							<span
								key={f}
								className='text-[0.72rem] text-[#7a9468] bg-[rgba(160,200,130,0.18)] border border-[rgba(140,180,110,0.3)] rounded-full px-2.5 py-0.5 tracking-wider font-medium'>
								{f}
							</span>
						))}
					</div>
				</div>

				{/* Error */}
				{error && (
					<div className='mt-3.5 bg-[rgba(220,100,80,0.08)] border border-[rgba(220,100,80,0.25)] rounded-xl px-4 py-2.5 text-[0.8rem] text-[#b04030] flex items-center gap-2'>
						<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
							<circle cx='8' cy='8' r='7' stroke='#c04030' strokeWidth='1.5' />
							<path
								d='M8 5v4M8 11v.5'
								stroke='#c04030'
								strokeWidth='1.5'
								strokeLinecap='round'
							/>
						</svg>
						{error}
					</div>
				)}

				{/* File List */}
				{files.length > 0 && (
					<>
						<div className='flex items-center justify-between mt-8 mb-3.5'>
							<span className='font-serif text-lg text-[#3a4d2a]'>
								{files.length} image{files.length !== 1 ? "s" : ""} selected
							</span>
							<button
								className='text-[0.78rem] text-[#a08060] bg-transparent border-none cursor-pointer px-2.5 py-1 rounded-lg transition-colors duration-150 hover:bg-[rgba(160,128,96,0.1)] hover:text-[#7a5a3a] font-sans'
								onClick={clearAll}>
								Clear all
							</button>
						</div>

						<div className='flex flex-col gap-2.5'>
							{files.map(({ id, file, preview, progress, done }) => (
								<div
									key={id}
									className='flex items-center gap-3.5 bg-[rgba(240,248,230,0.7)] border border-[rgba(180,210,150,0.35)] rounded-2xl p-3 transition-all duration-200 hover:border-[rgba(140,190,110,0.55)] hover:bg-[rgba(230,245,215,0.8)] animate-[slideIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]'
									style={{
										animation: "slideIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
									}}>
									<style>{`
										@keyframes slideIn {
											from { opacity: 0; transform: translateY(12px) scale(0.97); }
											to   { opacity: 1; transform: translateY(0) scale(1); }
										}
										@keyframes shimmer {
											from { transform: translateX(-100%); }
											to   { transform: translateX(200%); }
										}
										@keyframes popIn {
											from { transform: scale(0); opacity: 0; }
											to   { transform: scale(1); opacity: 1; }
										}
										.progress-shimmer::after {
											content: '';
											position: absolute;
											inset: 0;
											background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
											animation: shimmer 1.2s infinite;
										}
										.done-badge-anim {
											animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
										}
									`}</style>

									<img
										src={preview}
										alt={file.name}
										className='w-[52px] h-[52px] rounded-[10px] object-cover flex-shrink-0 border border-[rgba(160,200,130,0.4)]'
									/>

									<div className='flex-1 min-w-0'>
										<div className='text-sm text-[#2d3a22] font-medium truncate mb-1'>
											{file.name}
										</div>
										<div className='text-[0.75rem] text-[#9aaa88] mb-1.5'>
											{formatSize(file.size)}
										</div>
										<div className='h-[5px] bg-[rgba(180,210,150,0.3)] rounded-full overflow-hidden'>
											<div
												className={`h-full rounded-full relative transition-[width] duration-150 ease-linear ${
													done
														? "bg-gradient-to-r from-[#5aaa40] to-[#3a8c24]"
														: "bg-gradient-to-r from-[#7ab85c] to-[#4a9c30] progress-shimmer"
												}`}
												style={{ width: `${progress}%` }}
											/>
										</div>
									</div>

									<div className='flex-shrink-0 flex items-center gap-2'>
										{done ? (
											<div className='w-[22px] h-[22px] bg-[#4a9c30] rounded-full flex items-center justify-center done-badge-anim'>
												<svg
													width='12'
													height='12'
													viewBox='0 0 12 12'
													fill='none'>
													<path
														d='M2 6l3 3 5-5'
														stroke='#fff'
														strokeWidth='1.8'
														strokeLinecap='round'
														strokeLinejoin='round'
													/>
												</svg>
											</div>
										) : (
											<span className='text-[0.75rem] text-[#7a9468] font-medium min-w-[34px] text-right'>
												{Math.round(progress)}%
											</span>
										)}
										<button
											className='w-7 h-7 rounded-full border border-[rgba(180,150,130,0.35)] bg-[rgba(255,245,235,0.8)] text-[#c08070] text-sm leading-none cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[rgba(220,100,80,0.12)] hover:border-[rgba(220,100,80,0.4)] hover:text-[#c04030] hover:scale-110'
											onClick={() => removeFile(id)}>
											×
										</button>
									</div>
								</div>
							))}
						</div>

						{files.some((f) => f.done) && (
							<button
								disabled={identifyLoading}
								onClick={handlePlantIdentification}
								className='w-full mt-5 py-4 bg-gradient-to-br from-[#4a7c3f] to-[#2e5c24] text-white border-none rounded-2xl font-serif text-lg cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-200 shadow-lg hover:from-[#3b6432] hover:to-[#254d1c] hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 tracking-wide'>
								<svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
									<path
										d='M10 3v10M6 7l4-4 4 4M4 15h12'
										stroke='#fff'
										strokeWidth='1.8'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>

								{identifyLoading
									? "Analyzing"
									: `Analyze ${files.filter((f) => f.done).length} Plant Image
								${files.filter((f) => f.done).length !== 1 ? "s" : ""}`}
							</button>
						)}
					</>
				)}
			</div>
		</div>
	);
}
