import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./NewsLetter.scss"

import React from 'react'

function NewsLetter() {
    return (
        <div className="newsletter-section">
            <div className="newsletter-content">
                <span className="small-text">Newsletter</span>
                <span className="big-text">
                    Sign up for latest updates and offers
                </span>
                <div className="form">
                    <input type="text" placeholder="Email Address" />
                    <button>Subscribe</button>
                </div>
                <span className="text">
                    Will be used in accordance with our Privacy Policy
                </span>
                <span className="social-icons">
                    <div className="icon">
                        <LinkedInIcon size={14} />
                    </div>
                    <div className="icon">
                        <FacebookIcon size={14} />
                    </div>
                    <div className="icon">
                        <TwitterIcon size={14} />
                    </div>
                    <div className="icon">
                        <InstagramIcon size={14} />
                    </div>
                </span>
            </div>
        </div>
    );
}

export default NewsLetter
