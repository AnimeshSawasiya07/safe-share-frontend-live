import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import "./Footer.css"

export const Footer = () => {
    return (
        <footer className="text-light">
            <div className=' subscribe-section d-flex flex-column align-items-center pt-5 '>
                <h4>Stay Updated with</h4>
                <h2 className="text-success">SafeShare</h2>
                <div className="mb-4 d-flex flex-column align-items-center">
                    <span className='footer-about'>Get the latest updates on new features, community stories, and exclusive</span>
                    <span className='footer-about'>offers.</span>
                </div>
                <div className="d-flex justify-content-center gap-3">
                    <input className='form-control subscribe-email h-100' type="text" placeholder='Enter your Email' />
                    <button className="btn buy-rent-button text-white">Subscribe</button>
                </div>
            </div>
            <hr className="border-secondary text-white" />

            <div className='container h-100 pt-3 mb-5'>
                <div className="row text-start">
                    {/* ShareHub Info */}
                    <div className="col-md-4 mb-4">
                        <img className='footer-logo' src="/images/logo.png" alt="" />
                        <h5 className="text-success">SafeShare</h5>
                        <p className='p'>
                            Building a sustainable sharing economy that connects communities and reduces waste.
                            Join us in creating a better world through sharing.
                        </p>
                        <p className='p'><i className="bi bi-envelope"></i> hello@sharehub.com</p>
                        <p className='p'><i className="bi bi-telephone"></i> +1 (555) 123-4567</p>
                        <p className='p'><i className="bi bi-geo-alt"></i> San Francisco, CA</p>
                        <div className="d-flex gap-3 mt-2">
                            <a href="#" className="text-light a"><FaFacebookF /></a>
                            <a href="#" className="text-light a"><FaTwitter /></a>
                            <a href="#" className="text-light a"><FaInstagram /></a>
                            <a href="#" className="text-light a"><FaLinkedinIn /></a>
                        </div>
                    </div>
                    <div className="col-md-2 mb-4 mt-5 pt-5">
                        <h6>Product</h6>

                        <ul className="list-unstyled">
                            <li><a href="#" className="a text-decoration-none">Features</a></li>
                            <li><a href="#" className="a text-decoration-none">Pricing</a></li>
                            <li><a href="#" className="a text-decoration-none">Security</a></li>
                            <li><a href="#" className="a text-decoration-none">Mobile App</a></li>
                        </ul>
                    </div>
                    {/* Company */}
                    <div className="col-md-2 mb-4 mt-5 pt-5">
                        <h6>Company</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="a text-decoration-none">About Us</a></li>
                            <li><a href="#" className="a text-decoration-none">Careers</a></li>
                            <li><a href="#" className="a text-decoration-none">Press</a></li>
                            <li><a href="#" className="a text-decoration-none">Blog</a></li>
                        </ul>
                    </div>
                    {/* Support */}
                    <div className="col-md-2 mb-4 mt-5 pt-5">
                        <h6>Support</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="a text-decoration-none">Help Center</a></li>
                            <li><a href="#" className="a text-decoration-none">Contact Us</a></li>
                            <li><a href="#" className="a text-decoration-none">FAQs</a></li>
                            <li><a href="#" className="a text-decoration-none">Community</a></li>
                        </ul>
                    </div>
                    {/* Legal */}
                    <div className="col-md-2 mb-4 mt-5 pt-5">
                        <h6>Legal</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="a text-decoration-none">Privacy Policy</a></li>
                            <li><a href="#" className="a text-decoration-none">Terms of Service</a></li>
                            <li><a href="#" className="a text-decoration-none">Cookie Policy</a></li>
                            <li><a href="#" className="a text-decoration-none">Refund Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Bottom Footer */}
            <div className="container h-100 text-center mt-4 pt-3 border-top border-secondary">
                <p className="mb-1">© 2024 SafeShare. All rights reserved.</p>
                <small className="text-success">● All systems operational</small>
            </div>
        </footer >
    );
};
