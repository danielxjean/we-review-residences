import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PrivateRouting from './PrivateRouting';
import Signin from './pages/Home/Signin';
import Signup from './pages/Home/Signup';
import Profile from './pages/Home/Profile';

import Home from './pages/Home/Home';
import CreateReviewCard from './components/CreateReviewCard';
import CreateResidenceCard from './components/CreateResidenceCard';
import About from './pages/Home/About';
import ReviewCard from './components/ReviewCard';
import MyReviews from './components/MyReviews';


class Routing extends Component {
	render() {
		return (
            <>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route path="/user/edit/:userId" 
                        element={
                        <PrivateRouting>
                            <Profile />
                            <CreateReviewCard />
                        </PrivateRouting>
                        }
                    />
                    <Route path="/profile" 
                        element= {
                            <PrivateRouting>
                                <Profile />
                            </PrivateRouting>
                        }
                    />

                    <Route path="/user/:userId" element={<Profile />} />
                    <Route path="/createReview" element={<CreateReviewCard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/myReviews" element={<MyReviews />} />
                    <Route path="/reviews/:residenceId" element={<ReviewCard />} />
                    <Route path="/createResidence" element={<CreateResidenceCard />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    
                </Routes>
            </>
		);
	}
}

export default Routing;