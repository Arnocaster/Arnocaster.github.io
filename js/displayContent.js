/**
 * div years__container
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
 */



function htmlConstructor(){
    // !!Englobe toutes les années
    // div year__container
    let htmlOutputElt = document.createElement('div');
    htmlOutputElt.classList.add('years__container');

    //On lit yearsArray
    for (let thisYear = 0; thisYear < yearsArray.length ; thisYear++){
        let yearNumber = yearsArray[thisYear].year;
        // !! une année = Englobe couv + toutes les conférences
        // div singleYear__container
        let singleYearElt = document.createElement('div');
        singleYearElt.classList.add('singleYear','singleYear__container');

        // !!couverture de l'année
        // img singleYear__cover
        let singleYearCoverElt = document.createElement('div');
        singleYearCoverElt.classList.add('singleYear','singleYear__cover');
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

                // !!Nom de la conference
                // singleConference__name
                let singleConferencesNameElt = document.createElement('div');
                singleConferencesNameElt.classList.add('singleConference','singleConference__name');
                singleConferencesNameElt.textContent = thisConferenceData.name;
                singleConferenceContainerElt.appendChild(singleConferencesNameElt);

                // !!Auteur de la conference
                //  singleConference__author
                let singleConferencesAuthorElt = document.createElement('div');
                singleConferencesAuthorElt.classList.add('singleConference','singleConference__author');
                singleConferencesAuthorElt.textContent = thisConferenceData.author;
                singleConferenceContainerElt.appendChild(singleConferencesAuthorElt);
                

                //  !!Desccription de la conference
                //  singleConference__description
                let singleConferencesDescriptionElt = document.createElement('div');
                singleConferencesDescriptionElt.classList.add('singleConference','singleConference__description');
                singleConferencesDescriptionElt.textContent = thisConferenceData.description;
                singleConferenceContainerElt.appendChild(singleConferencesDescriptionElt);

                //  !!Video de la conference
                //  singleConference__video
                let singleConferencesVideoElt = document.createElement('div');
                singleConferencesVideoElt.classList.add('singleConference','singleConference__video');
                singleConferenceContainerElt.appendChild(singleConferencesVideoElt);
                //On pousse la conférence complète dans conference__container
                conferencesContainerElt.appendChild(singleConferenceContainerElt);
                //On pousse le container de toutes les conférences dans le container de l'année
                singleYearElt.appendChild(conferencesContainerElt);
            }
         
        }
      


        //On push singleYear__container dans htmloutput
        htmlOutputElt.appendChild(singleYearElt);
    }
    return htmlOutputElt;
}

