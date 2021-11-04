/**
 *  * div years__container
 * !!Englobe couv + toutes les conférences
 * div singleYear__container
 *  !!couverture de l'année
 *  img singleYear__cover
 *  !!Englobes toutes les conférences d'une année
 *  div conferences__container
 *      !!Englobe une conférence
 *     singleConference__container
 *          !!Nom de la conference
 *          singleConference__name
 *          !!Auteur de la conference
 *          singleConference__author
 *          !!Desccription de la conference
 *          singleConference__description
 *          !!Video de la conference
 *          singleConference__video
 * @returns element html complet de main
 */
function mainConstructor(){
    // !!Englobe toutes les années
    // div year__container
    let mainHtmlElt = document.createElement('div');
    mainHtmlElt.classList.add('years__container');

    //On lit yearsArray
    for (let thisYear = 0; thisYear < yearsArray.length ; thisYear++){
        let yearNumber = yearsArray[thisYear].year;
        // !! une année = Englobe couv + toutes les conférences
        // div singleYear__container
        let singleYearElt = document.createElement('div');
        singleYearElt.classList.add('singleYear','singleYear__container');
        singleYearElt.id = `${yearsArray[thisYear].year}`;

        // !!couverture de l'année
        // img singleYear__cover
        let singleYearCoverElt = document.createElement('div');
        singleYearCoverElt.classList.add('singleYear','singleYear__cover');
        singleYearCoverElt.textContent = yearsArray[thisYear].year;
        //On push singleYear__container dans singleYearElt
        singleYearElt.appendChild(singleYearCoverElt);

        //!!Englobes toutes les conférences d'une année
        //div conferences__containter
        let conferencesContainerElt = document.createElement('div');
        conferencesContainerElt.classList.add('conference','conferences__container');

        //!!On boucle sur les conférences
        for (let thisConference = 0; thisConference < conferencesArray.length;thisConference++){
            //SUGAR : On stocke l'objet de la conférence dans une variable
            let thisConferenceData = conferencesArray[thisConference];

           
                
            //Si l'année en cours de lecture === data.year
            if ( thisConferenceData.year == yearNumber){
                // !!Englobe une conférence
                // singleConference__container
                let singleConferenceContainerElt = document.createElement('div');
                singleConferenceContainerElt.classList.add('singleConference','singleConference__container'); 
                //Création du header qui contiendra name et author
                let singleConferenceHeaderElt = document.createElement('div');
                singleConferenceHeaderElt.classList.add('singleConference','singleConference__header'); 

                //  !!Video de la conference
                //  singleConference__video
                let singleConferencesVideoElt = document.createElement('div');
                singleConferencesVideoElt.classList.add('singleConference','singleConference__video');
                singleConferenceContainerElt.appendChild(singleConferencesVideoElt);

                // !!Nom de la conference
                // singleConference__name
                let singleConferencesNameElt = document.createElement('div');
                singleConferencesNameElt.classList.add('singleConference','singleConference__name');
                singleConferencesNameElt.textContent = thisConferenceData.name;
                singleConferenceHeaderElt.appendChild(singleConferencesNameElt);

                // !!Auteur de la conference
                //  singleConference__author
                let singleConferencesAuthorElt = document.createElement('div');
                singleConferencesAuthorElt.classList.add('singleConference','singleConference__author');
                singleConferencesAuthorElt.textContent = thisConferenceData.author;
                singleConferenceHeaderElt.appendChild(singleConferencesAuthorElt);

                //On pousse singleConferenceHeader dans singleConferenceContainerElt
                singleConferenceContainerElt.appendChild(singleConferenceHeaderElt);
                

                //  !!Desccription de la conference
                //  singleConference__description
                let singleConferencesDescriptionElt = document.createElement('div');
                singleConferencesDescriptionElt.classList.add('singleConference','singleConference__description');
                singleConferencesDescriptionElt.textContent = thisConferenceData.description;
                singleConferenceContainerElt.appendChild(singleConferencesDescriptionElt);

                //On pousse la conférence complète dans conference__container
                conferencesContainerElt.appendChild(singleConferenceContainerElt);
                //On pousse le container de toutes les conférences dans le container de l'année
                singleYearElt.appendChild(conferencesContainerElt);
            }
         
        }
      


        //On push singleYear__container dans htmloutput
        mainHtmlElt.appendChild(singleYearElt);
    }
    return mainHtmlElt;
}

/**
 * 
 * @returns l'élément html complet de aside
 */

function asideConstructor(){
    let asideHtmlElt = document.createElement('div');
    asideHtmlElt.classList.add('aside__container');

    for (let thisYear = 0 ; thisYear < yearsArray.length; thisYear++){
        let thisLinkElt = document.createElement('a');
        thisLinkElt.classList.add('aside__link');
        thisLinkElt.setAttribute('href',`#${yearsArray[thisYear].year}`);
        thisLinkElt.textContent = yearsArray[thisYear].year;
        // On pousse le lien dans asideHtmlEls
        asideHtmlElt.appendChild(thisLinkElt);
        
    }
   

    return asideHtmlElt;
}

