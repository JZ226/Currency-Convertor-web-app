const Dropdown = document.querySelectorAll('.drop_down select');
const Btn = document.querySelector("button");
const BaseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const ToCurrency = document.querySelector('.To select');
const FromCurrency = document.querySelector('.From select');
const Message = document.querySelector('.divbtn');
for (let select of Dropdown){
    for(let code in countryList){
       let new_Option = document.createElement("option");
       new_Option.innerText= code;
       new_Option.value=code;
       select.append(new_Option);
       if(select.name==='from' && code==='USD'){
            new_Option.selected='selected';
       }
      else if(select.name==='to' && code==='PKR'){
        new_Option.selected='selected';
   }
   select.append(new_Option);
    }
    select.addEventListener('change',(evt)=>{
      FlagCahnge(evt.target);
    });
}
 
const FlagCahnge =(element)=>{
        let code = element.value;
        let countrycode= countryList[code];
        let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
        let img = element.parentElement.querySelector("img");
        img.src=newsrc;
};
Btn.addEventListener('click', async (evt)=>{
    evt.preventDefault();
    let Amount = document.querySelector(".amount input");
    let amtVAl=Amount.value;
  if(amtVAl==="" && amtVAl<1){
     amtVAl=1;
    Amount.value='1';
  }
  const URL = `${BaseURL}/${FromCurrency.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let  rate=  data[FromCurrency.value.toLowerCase()];
  const conversionRate = rate[ToCurrency.value.toLowerCase()];
  const result = amtVAl * conversionRate;
  Message.innerText = `${amtVAl}${FromCurrency.value} = ${result} ${ToCurrency.value}`;
});

