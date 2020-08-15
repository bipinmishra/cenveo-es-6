


function searchList(){
  let _inputText = document.getElementById('input-text').value.toLowerCase().replace(/\s+/g,' ').trim();
  let _category = document.getElementById('category').value;
   
  console.log( _inputText);
  console.log(_category);

  if(_inputText.length && _inputText !== '' ){
    var  _inputTextlist =  splitString(_inputText);
    findContent(_inputTextlist, _category);
  }else{
     alert('Please Enter Something to search')
  }

 console.log(_inputTextlist);
 console.log(  CBDynamicContent);
  


}


let CBDynamicContent;

function getAppData(){
$.getJSON( "assets/data/music.json", function( data ){
  CBDynamicContent = data;
  console.log(CBDynamicContent);
 }).fail(function() {
  alert( "Error in loading Data ! Please run via local host or Host in some Sever" );
});
}

getAppData();

//Split String value 
function splitString(string){
    return  string.split(' ');
};

//Find Content ===========
let searchResultIndex= [];
function findContent(element, category){
   searchResultIndex = [];
  for(let i = 0; i < element.length; i++){
      
              if(category === 'all'){

              for(let j=0; j<  CBDynamicContent.sections[0].assets.length; j++){

                // Search im keyword =========================
                var keywords =  CBDynamicContent.sections[0].assets[j].keywords.map(val => val.toLowerCase().replace( /(<([^>]+)>)/ig, ''));
                let _index = keywords.indexOf(element[i]);
                // console.log(_index);
          
                // Search in Title =========================
                let _indexTitle = CBDynamicContent.sections[0].assets[j].title.toLowerCase().replace( /(<([^>]+)>)/ig, '').indexOf(element[i]);
                // console.log(_indexTitle);
            
                // Search in Description =========================
                let _indexDescription = CBDynamicContent.sections[0].assets[j].description[0].toLowerCase().replace( /(<([^>]+)>)/ig, '').indexOf(element[i]);
                // console.log(_indexDescription);

              
                  if(_index > -1 || _indexTitle > -1 || _indexDescription > -1){
                    searchResultIndex.push(j);
                  }
              }
            }

            if(category === 'title'){

              for(let j=0; j<  CBDynamicContent.sections[0].assets.length; j++){

              // Search in Title =========================
              let _indexTitle = CBDynamicContent.sections[0].assets[j].title.toLowerCase().replace( /(<([^>]+)>)/ig, '').indexOf(element[i]);
              // console.log(_indexTitle);
          

                if( _indexTitle > -1){
                  searchResultIndex.push(j);
                }
              }
          }


          if(category === 'decs'){
            for(let j=0; j<  CBDynamicContent.sections[0].assets.length; j++){
            // Search in Description =========================
            let _indexDescription = CBDynamicContent.sections[0].assets[j].description[0].toLowerCase().replace( /(<([^>]+)>)/ig, '').indexOf(element[i]);
            // console.log(_indexDescription);

          
              if( _indexDescription > -1){
                searchResultIndex.push(j);
              }
            }
        }


        if(category === 'key'){

          for(let j=0; j<  CBDynamicContent.sections[0].assets.length; j++){

            // Search im keyword =========================
            var keywords =  CBDynamicContent.sections[0].assets[j].keywords.map(val => val.toLowerCase().replace( /(<([^>]+)>)/ig, ''));
            let _index = keywords.indexOf(element[i]);
            // console.log(_index);
        
            if(_index > -1){
              searchResultIndex.push(j);
            }
          }
        }
      
    // CBDynamicContent.sections[0].assets[0].asset_type_title ;
  
    // CBDynamicContent.sections[0].assets[0].keywords;

   console.log(element[i]);
  }

  let finalSearchIndex = [...new Set(searchResultIndex)];
  console.log(finalSearchIndex);
  PrintResult(finalSearchIndex);
}

function PrintResult(_list){
  document.getElementById('search-ul').innerHTML = '';
  if(_list.length){
        for(let i = 0;  i < _list.length; i++ ){
      let html = '<li>'+
            '  <div class="music-detail">'+
            '<div class="img-wrap">'+
            '<img src="assets/images/music-img.jpg" alt="music image">'+
            '</div>'+
            '<div class="content-wrap">'+
            '<h3>' + CBDynamicContent.sections[0].assets[_list[i]].title + '</h3>'+
            '<p>' + CBDynamicContent.sections[0].assets[_list[i]].supplement_information[0] + '</p>'+
            '<p>'+ CBDynamicContent.sections[0].assets[_list[i]].description[0] +'</p>'+
            '<a href="javascript:void(0);"> <img src="assets/images/playicon.png" alt="Play icon"> Play Vocal</a>'+
            '<a href="javascript:void(0);">Lyrics (PDF)</a>'+
            '</div>'+
            '  </div>'+
            '</li>';
            document.getElementById('search-ul').innerHTML +=  html;
    }
  }else{
    document.getElementById('search-ul').innerHTML +=  '<li class="text-center"><h4> No Result Found !!! </h4></li>';
  }
}