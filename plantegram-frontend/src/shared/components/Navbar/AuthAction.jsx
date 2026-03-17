import { Link } from "react-router-dom";
const AuthAction = ({ isAuthenticated, onLogout, className }) =>
	isAuthenticated ? (
		<button type='button' onClick={onLogout} className={className}>
			LOGOUT
		</button>
	) : (
		<Link to='/login' className={className}>
			LOGIN
		</Link>
	);

export default AuthAction;
