import React from 'react';
import About from './About';
import FluffyPic from './static/images/fluffy.jpg'

const abtUsText = 'RecruitFind Helps recruiters find the best Candidate for the job and Candidates get job offers that are right for them. Candidates share their skills, resume, achievements, etc. so recruiters can reach out to them if they possess the right skills. We are focused on freelancers and individuals at the beginning of their career and we plan to minimize their burden of reaching out to numerous recruiters without being overwhelmed by essays and applications. Something specific to the application is that Recruiters who are knowledgeable of job aspects can propose the right job for a candidate. For instance, a student may not know about the role of a business analyst while having overlapping interests in business and technology. Recruiters, with the knowledge of the job field, is able to suggest a job they may not have reached for otherwise.'

const connie = { 
    name : 'Connie Deng',
    description: 'lol',
    picture: FluffyPic 
}

const elijah = { 
    name : 'Elijah',
    description: 'what',
    picture: FluffyPic 
}
const such = { 
    name : 'Such',
    description: 'am i',
    picture: FluffyPic 
}

const wil = { 
    name : 'Wil',
    description: 'doing',
    picture: FluffyPic 
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