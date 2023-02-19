const generatedPass = document.querySelector('.password__generated');
const generateBtn = document.querySelector('.settings__generate');
const rangeLength = document.querySelector('.settings__range');
const rangeNumber = document.querySelector('.settings__chars-length');
const copyPass = document.querySelector('.password__copy');
const tooltip = document.getElementById("myTooltip");
const strengthBars = document.querySelectorAll('.bar');
const strengthDescription = document.querySelector('.settings__strength-description');
const upperCase = document.getElementById('uppercase');
const lowerCase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const themeDark = document.querySelector('.themeIcon__dark');
const themeLight = document.querySelector('.themeIcon__light');


let theme = localStorage.getItem('theme');
let passGenerated = false;

themeDark.addEventListener('click', () => {
   localStorage.setItem('theme', 'dark');
   if (!themeDark.classList.contains('active-theme')) {
      themeLight.classList.remove('active-theme');
      themeDark.classList.add('active-theme');
      changeTheme('dark');
   }
});

themeLight.addEventListener('click', () => {
   localStorage.setItem('theme', 'light');
   if (!themeLight.classList.contains('active-theme')) {
      themeDark.classList.remove('active-theme');
      themeLight.classList.add('active-theme');
      changeTheme('light');   
   }
});

rangeLength.addEventListener('input', (e) => {
   rangeNumber.textContent = e.target.value;
})

const getRandomPass = (length) => {
   let upperCaseStr = '';
   let lowerCaseStr = '';
   let numbersStr = '';
   let symbolsStr = '';
   let result = '';
   
   if (upperCase.checked) upperCaseStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   if (lowerCase.checked) lowerCaseStr = 'abcdefghijklmnopqrstuvwxyz';
   if (numbers.checked) numbersStr = '0123456789';
   if (symbols.checked) symbolsStr = '!@#$%^&*()';
   
   const finalString = upperCaseStr + lowerCaseStr + numbersStr + symbolsStr;
   
   for (let i = 0; i < length; i++) {
      result += finalString.charAt(Math.floor(Math.random() * finalString.length));
   }
   
   generatedPass.style.color = 'var(--white)';
   generatedPass.textContent = result;
}

const strengthRating = (length) => {
   const colors = {
      weak: 'var(--clr-weak)',
      medium: 'var(--clr-medium)',
      strong: 'var(--clr-strong)'
   };

   const checkSettings = [upperCase.checked, lowerCase.checked, numbers.checked, symbols.checked];
   const isOneTrue = checkSettings.filter(el => el === true);

   if (isOneTrue.length === 1) {
      for (let i = 0; i < 1; i++) {
         strengthBars[i].style.backgroundColor = colors.weak;
      }
      strengthDescription.textContent = 'Weak';
   } else if (isOneTrue.length === 2 && length <= 10) {
      for (let i = 0; i < 1; i++) {
         strengthBars[i].style.backgroundColor = colors.weak;
      }
      strengthDescription.textContent = 'Weak';
   } else if (isOneTrue.length === 2) {
      for (let i = 0; i < 2; i++) {
         strengthBars[i].style.backgroundColor = colors.medium;
      }
      strengthDescription.textContent = 'Medium';
   } else if (isOneTrue.length === 3 && length <= 10) {
      for (let i = 0; i < 2; i++) {
         strengthBars[i].style.backgroundColor = colors.medium;
      }
      strengthDescription.textContent = 'Medium';
   } else if (isOneTrue.length === 3) {
      for (let i = 0; i < 3; i++) {
         strengthBars[i].style.backgroundColor = colors.medium;
      }
      strengthDescription.textContent = 'Medium';
   } else if (isOneTrue.length > 3 && length <= 10) {
      for (let i = 0; i < 3; i++) {
         strengthBars[i].style.backgroundColor = colors.medium;
      }
      strengthDescription.textContent = 'Medium';
   } else if (isOneTrue.length > 3) {
      for (let i = 0; i < 4; i++) {
         strengthBars[i].style.backgroundColor = colors.strong;
      }
      strengthDescription.textContent = 'Strong';
   }
}

const changeTheme = theme => {
   const colorsLight = {
   '--clr-background': 'hsl(240, 22%, 96%)',
   '--clr-main': 'hsl(0, 0%, 100%)',
   '--clr-main-darker': 'hsl(240, 22%, 90%)',
   '--clr-accent': 'hsl(226, 59%, 41%)',
   '--clr-accent-darker': 'hsl(226, 65%, 36%)',
   '--clr-white': 'hsl(240, 16%, 17%)',
   '--clr-gray': 'hsl(249, 11%, 73%)',
   '--clr-outline': 'hsl(223, 30%, 33%)',
   '--clr-checkbox-hover': '226, 59%, 41%',
   '--font-weight': '500'
   };

   const colorsDark = {
   '--clr-background': 'hsl(252, 11%, 9%)',
   '--clr-main': 'hsl(249, 8%, 17%)',
   '--clr-main-darker': 'hsl(249, 11%, 13%)',
   '--clr-accent': 'hsl(54, 83%, 66%)',
   '--clr-accent-darker': 'hsl(54, 100%, 74%)',
   '--clr-white': 'hsl(255, 8%, 90%)',
   '--clr-outline': 'hsl(255, 8%, 50%)',
   '--clr-gray': 'hsl(249, 4%, 34%)',
   '--clr-checkbox-hover': '54, 83%, 66%',
   '--font-weight': '400'
   }

   if (theme === 'dark') {
      for(let color in colorsDark) {
         document.documentElement.style.setProperty(color, colorsDark[color]);
      }
   } 
   if (theme === 'light') {
      for(let color in colorsLight) {
         document.documentElement.style.setProperty(color, colorsLight[color]);
      }
   }
}


if (theme === 'dark') {
   changeTheme('dark');
   themeLight.classList.remove('active-theme');
   themeDark.classList.add('active-theme');
} else if (theme === 'light') {
   changeTheme('light');
   themeDark.classList.remove('active-theme');
   themeLight.classList.add('active-theme');
}

const copyPassword = async () => {
   try {
      await navigator.clipboard.writeText(generatedPass.textContent);
   } catch (error) {
      console.error('Failed to copy', error);
   }
}

copyPass.addEventListener('click', () => {
   if (passGenerated) {
      copyPassword();
      tooltip.textContent = `Password copied`;
   }
});

const resetTooltip = () => {
   if (passGenerated) {
      tooltip.textContent = "Copy to clipboard";
   }
}

generateBtn.addEventListener('click', () => {
   if (checkStatus()) {
      passGenerated = true;
      tooltip.textContent = `Copy to clipboard`;
      copyPass.style.opacity = '1';
      const passLength = rangeLength.value;
      getRandomPass(passLength);
      for (let i = 0; i < strengthBars.length ; i++) {
         strengthBars[i].style.backgroundColor = 'transparent';
      }
      strengthRating(passLength);
   } else {
      
      passGenerated = false;
      generatedPass.textContent = 'Pa$sW0rD';
      generatedPass.style.color = 'var(--clr-gray)';
      tooltip.textContent = `Nothing to copy`;
      copyPass.style.opacity = '0.5';
      for (let i = 0; i < strengthBars.length; i++) {
         strengthBars[i].style.backgroundColor = 'transparent';
      }
      strengthDescription.textContent = '';
   }
});

const checkStatus = () => {
   const checkSettings = [upperCase.checked, lowerCase.checked, numbers.checked, symbols.checked];
   
   const isOneTrue = checkSettings.filter(el => el === true);

   if(isOneTrue[0] === true) {
      return true;
   };
}

const slider = () => {
   let rangePercent = ((rangeLength.value - rangeLength.min) / (rangeLength.max - rangeLength.min)) * 100;

   rangeLength.style.background = `linear-gradient(to right, var(--clr-accent) ${rangePercent}%, var(--clr-main-darker) ${rangePercent}%)`;
}

