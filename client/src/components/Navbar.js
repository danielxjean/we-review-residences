import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Home from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from './auth/auth-helper';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import About from '../pages/Home/About';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();
    
    return (
      <Component
        history={history}
        {...props}
        />
    );
  };
  
  return Wrapper;
};

const isActive = (history, path) => {
	if (history.location.pathname === path) return { color: '#F44336' };
	else return { color: '#ffffff' };
};

const Menu = withRouter(({ history }) => (
	<AppBar position="static">
		<Toolbar>
			<Typography type="title" color="inherit">
				MERN App
			</Typography>
			<Link to="/">
				<IconButton aria-label="Home" >
					<Home />
				</IconButton>
			</Link>
			<Link to="/about">
				<About />
			</Link>
			{!auth.isAuthenticated() && (
				<span>
					<Link to="/signup">
						<Button>Sign up</Button>
					</Link>
					<Link to="/signin">
						<Button >Sign In</Button>
					</Link>
				</span>
			)}
			{auth.isAuthenticated() && (
				<span>
					<Link to={'/user/' + auth.isAuthenticated().user._id}>
						<Button
							style={isActive(
								history,
								'/user/' + auth.isAuthenticated().user._id
							)}
						>
							My Profile
						</Button>
					</Link>
					<Button
						color="inherit"
						onClick={() => {
							auth.signout(() => history.push('/'));
						}}
					>
						Sign out
					</Button>
				</span>
			)}
		</Toolbar>
	</AppBar>
));

export default Menu;