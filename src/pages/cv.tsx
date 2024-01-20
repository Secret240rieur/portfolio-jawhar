import React from 'react';
import './cv.css';
import { Outlet, Link } from "react-router-dom";
import Navbardown from './navbardown';
import { CommentSection } from './commentSection';

const Cv = () => {
    return (
        <div className="cv">

            <div className="grid-container Header" id="Header">
                <div className="grid-item1 description">
                    <h2 className="name" >Jawhar El Harrak</h2>
                    <ul className="info">
                        <li className="address">6920 Fielding</li>
                        <li>Montreal, H4V1P5</li>
                        <li><a href="tel:+14382236939">+1 (438) 223-6939</a></li>
                        <li><a href="mailto:elharrakjawhar2000@gmail.com">elharrakjawhar2000@gmail.com</a> </li>
                    </ul>
                </div>
                <div className="grid-item1 pdp_box"><img src={require("../Assets/multimedia/PHOTO_PASSPORT.jpg")} alt="" /></div>
            </div>
            <div className='flex mx-auto flex-col w-fit'>

                <h1 className='font-bold text-[100px]'>Hi, I‘m Jawhar  </h1>
                <p className='mx-auto'>Video game developer and web developer.</p>
                <Link to="/contact" className='bg-black flex mx-auto w-fit py-[10px] px-[40px] mt-[20px] rounded-[30px] text-gray-300'>Hire Me</Link></div>

            <ul className="grid-item sommaire">
                <h2>Sommaire</h2>
                <li><a href="#Presentation">Presentation</a></li>
                <li><a href="#Experience">Experience</a></li>
                <li><a href="#Education">Education</a></li>
                <li><a href="#Leadership">Leadership</a></li>
            </ul>

            <div className="grid-item objective">
                <h3 className="title" id="Presentation">Presentation </h3>
                <p className="item-box Objective">Je m‘appelle Jawhar étudiant au collège LaSalle en troisième année.
                    Je fais la programmation des jeux vidéo et le développement Web.
                    Je trouve que je suis plus développeur Web que je le suis en jeu vidéo, mais bref, mon langage préféré est JavaScript.
                    J‘aime toujours apprendre de nouveau truc surtout en React.
                    Dernièrement j‘apprends à utiliser TypeScript qui d‘ailleurs m‘a vraiment aidé à faire ce site.
                    Ce site est mon premier projet officiel et j‘espère que vous allez l‘aimer. </p>
            </div>
            <div className="grid-item experience">
                <h3 className="title" id="Experience">Experience</h3>
                <div className="item-box Experience">
                    <div className="grid-experience-section">

                        <div className="grid-experience-desc">
                            <span>Website Building</span>
                        </div>
                        <p className="comment">Ceci est mon premier site web. C‘est un projet React écrit en TypeScript et Tailwind,
                            j‘ai ensuite utilisé firebase pour la base de données et l‘authentification.
                            Je l'ai commencé avec JavaScript et CSS mais au fur et à mesure
                            je me sentais plus confiant de le faire avec un langage plus moderne et pratique.</p>
                    </div>
                    <div className="grid-experience-section">

                        <div className="grid-experience-desc">
                            <span>WinForms</span>
                        </div>
                        <p className="comment">Pendant mon cours de C# j‘ai pu me familiariser avec WinForms.
                            Ainsi j‘ai eu l‘occasion de faire quelques applications et jeux tel que PacMan et une calculatrice qui exécute des opérations simples. </p>
                    </div>
                    <div className="grid-experience-section">
                        <div className="grid-experience-desc">
                            <span>Unity</span>
                        </div>
                        <p className="comment">Avec une connaissance de base, j‘ai pu faire  quelques jeux avec Unity et c#. Pour un projet j‘ai fait un jeu d‘aventure, un labyrinthe avec plusieurs niveaux.</p>
                    </div>
                    <div className="grid-experience-section">
                        <div className="grid-experience-desc">
                            <span>Unreal</span>
                        </div>
                        <p className="comment">J‘ai un jeu en cours de developement avec Unreal. On va voir ce que ça va donner. </p>
                    </div>
                </div>

            </div>
            <div className="grid-item education">
                <h3 className="title" id="Education">Education</h3>
                <div className="item-box Education">
                    <div className="grid-education-section">
                        <div className="grid-school-desc">
                            <span>College LaSalle</span>
                        </div>
                        <p className="comment">Je fais un DEC en technique d‘informatique au college LaSalle branche jeux video. Ma formation est prévue de finir en mois de septembre 2023.
                        </p>
                    </div>

                </div>

            </div>
            <div className="grid-item certificats">
                <div className="title flex" id="Certificats">
                    <h3 >Certificats</h3>
                    <p className='ml-[50px] font-thin'>(click on link to view certificat)</p>
                </div>
                <ul className="item-box Certificats">
                    <li><Link to="/certificats">Certificat en Html5</Link></li>
                    <li><Link to="/certificats">Certificat en CSS</Link></li>
                    <li><Link to="/certificats">Certificat en JavaScript</Link></li>
                    <li><Link to="/certificats">Certificat en C#</Link></li>
                    <li><Link to="/certificats">Certificat en React Native</Link></li>
                </ul>

            </div>

            <div className="grid-item leadership">
                <h3 className="title" id="Leadership">Leadership</h3>
                <div className="item-box Leadership">
                    <li>Extroversion</li>
                    <li>Teamwork</li>
                    <li>Creativity</li>
                    <li>Effective communication</li>
                </div>


            </div>

            <Outlet />
            <CommentSection />

            <Navbardown />
        </div>
    );
};

export default Cv;