import React from 'react';
import About from './About';
import FluffyPic from './static/images/fluffy.jpg'
import Such from './static/images/such.png'
import Connie from './static/images/connie.png'
import Wil from './static/images/wil.jpg'
import Elijah from './static/images/elijah.jpeg'

const abtUsText = 'RecruitFind Helps recruiters find the best Candidate for the job and Candidates get job offers that are right for them. Candidates share their skills, resume, achievements, etc. so recruiters can reach out to them if they possess the right skills. We are focused on freelancers and individuals at the beginning of their career and we plan to minimize their burden of reaching out to numerous recruiters without being overwhelmed by essays and applications. Something specific to the application is that Recruiters who are knowledgeable of job aspects can propose the right job for a candidate. For instance, a student may not know about the role of a business analyst while having overlapping interests in business and technology. Recruiters, with the knowledge of the job field, is able to suggest a job they may not have reached for otherwise.'

const connie = { 
    name : 'Connie Deng',
    description: 'The Bean aka Best Engineer Around Noobs',
    picture: Connie 
}

const elijah = { 
    name : 'Elijah',
    description: 'The Backend Legend',
    picture: Elijah 
}
const such = { 
    name : 'Such',
    description: 'The Strategical Doc with pinpoint coding solving skills',
    picture: Such 
}

const wil = { 
    name : 'Wil',
    description: 'Just a guy who codes',
    picture: Wil 
} 
const AboutUsInfo = {  
    "abtUsText" : abtUsText,
    "team" : [
        connie,
        elijah,
        such,
        wil
    ]
}
export default AboutUsInfo;