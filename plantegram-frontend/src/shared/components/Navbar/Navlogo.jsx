import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PlantGreenLogo } from "../../../utils/icons";

const NavLogo = ({ onClick, brandName }) => (
	<div className='flex lg:flex-1'>
		<Link to='/' className='-m-1.5 p-1.5' onClick={onClick}>
			<span className='sr-only'>{brandName}</span>
			<PlantGreenLogo width={80} height={60} className='text-primary' />
		</Link>
	</div>
);

NavLogo.propTypes = {
	onClick: PropTypes.func,
	brandName: PropTypes.string.isRequired,
};
export default NavLogo;
