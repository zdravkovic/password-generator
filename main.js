// Link DOM elements to variables
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

// Get local storage item
let theme = localStorage.getItem('theme');

let passGenerated = false;

const init = () => {
   // Check which theme style is saved and load it from local storage
   checkLocalStorage();
   // Generate password
   generatePasswordHandler();
   // Switch themes using theme buttons
   themesHandler();
   // Copy password
   copyButtonHandler();
};

// Display range input in DOM
rangeLength.addEventListener('input', (e) => {
   rangeNumber.textContent = e.target.value;
});


const checkLocalStorage = () => {
   // On load check which theme is saved in local storage and set styles for that theme
   if (theme === 'dark') {
      changeTheme('dark');
      themeLight.classList.remove('active-theme');
      themeDark.classList.add('active-theme');
   } else if (theme === 'light') {
      changeTheme('light');
      themeDark.classList.remove('active-theme');
      themeLight.classList.add('active-theme');
   } else if (!theme) {
      // If no theme is saved in local storage, set 'dark' theme as default
      changeTheme('dark');
      themeLight.classList.remove('active-theme');
      themeDark.classList.add('active-theme');
   }
};

const themesHandler = () => {
   // Change theme to dark when clicked on dark button
   themeDark.addEventListener('click', () => {
      // Set local storage item 'theme' to dark
      localStorage.setItem('theme', 'dark');
      
      // Check if dark theme button doesn't already contain active class
      if (!themeDark.classList.contains('active-theme')) {
         // Remove active class from light theme button
         themeLight.classList.remove('active-theme');
         // Add active class to dark theme button
         themeDark.classList.add('active-theme');
         // Change theme to 'dark'
         changeTheme('dark');
      }
   });
   
   // Change theme to light when clicked on dark button
   themeLight.addEventListener('click', () => {
      // Set local storage item 'theme' to light
      localStorage.setItem('theme', 'light');
   
      // Check if light theme button doesn't already contain active class
      if (!themeLight.classList.contains('active-theme')) {
         // Remove active class from dark theme button
         themeDark.classList.remove('active-theme');
         // Add active class to light theme button
         themeLight.classList.add('active-theme');
         // Change theme to 'light'
         changeTheme('light');   
      }
   });
};

// Change theme handler
const changeTheme = theme => {
   // Save all colors for light and dark themes in objects
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

   // If function argument is 'dark'
   if (theme === 'dark') {
      // Loop through whole dark color object and add them ass :root css variables
      for(let color in colorsDark) {
         document.documentElement.style.setProperty(color, colorsDark[color]);
      }
   }
   // If function argument is 'light'
   if (theme === 'light') {
      // Loop through whole dark color object and add them ass :root css variables
      for(let color in colorsLight) {
         document.documentElement.style.setProperty(color, colorsLight[color]);
      }
   }
};

// Check if least one item (uppercase letter, lowercase letter, number, sybols) is checked
const checkStatus = () => {
   // Save all items through array
   const checkSettings = [upperCase.checked, lowerCase.checked, numbers.checked, symbols.checked];
   // Filter through all of them and return only the ones that are 'selected'
   const isOneTrue = checkSettings.filter(el => el === true);
   // If at least one is 'selected' return true
   if(isOneTrue[0] === true) {
      return true;
   };
};

// Get random password
const getRandomPass = (length) => {
   // Declare empty strings
   let upperCaseStr = '';
   let lowerCaseStr = '';
   let numbersStr = '';
   let symbolsStr = '';

   let result = '';
   
   // If checkbox is checked give variable corresponding values
   if (upperCase.checked) upperCaseStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   if (lowerCase.checked) lowerCaseStr = 'abcdefghijklmnopqrstuvwxyz';
   if (numbers.checked) numbersStr = '0123456789';
   if (symbols.checked) symbolsStr = '!@#$%^&*()';
   
   // Add all strings together
   const finalString = upperCaseStr + lowerCaseStr + numbersStr + symbolsStr;
   
   // For given length pull random characters from string and save them as new string
   for (let i = 0; i < length; i++) {
      result += finalString.charAt(Math.floor(Math.random() * finalString.length));
   }
   
   // Change text style in DOM
   generatedPass.style.color = 'var(--white)';
   // Change text with newly generated string
   generatedPass.textContent = result;
};

const generatePasswordHandler = () => {
   // Listen to click on generate button
   generateBtn.addEventListener('click', () => {
      // If at least one item (uppercase letter, lowercase letter, number, sybols) is checked
      if (checkStatus()) {
         passGenerated = true;
   
         // Change tooltip text and opacity to display it
         tooltip.textContent = `Copy to clipboard`;
         copyPass.style.opacity = '1';
   
         // Save password length as variable
         const passLength = rangeLength.value;
         // Get random password with given length
         getRandomPass(passLength);
         // Clear last 'strength bars' styles and give them new styles based on new generated password
         for (let i = 0; i < strengthBars.length ; i++) {
            strengthBars[i].style.backgroundColor = 'transparent';
         }
         strengthRating(passLength);
   
      } else {
         passGenerated = false;
   
         // Reset styles to default
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
};

// Get strength rating based on length and checked items
const strengthRating = (length) => {
   // Create object with all colors for password strength
   const colors = {
      weak: 'var(--clr-weak)',
      medium: 'var(--clr-medium)',
      strong: 'var(--clr-strong)'
   };
   
   // Filter through all checkbox items and pull only the ones that are 'checked'
   const checkSettings = [upperCase.checked, lowerCase.checked, numbers.checked, symbols.checked];
   const isOneTrue = checkSettings.filter(el => el === true);

   /* Based on how many items are selected and how long is password
   change color and how many 'bars' are vissible */
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
};

// Copy password handler
const copyPassword = async () => {
   try {
      await navigator.clipboard.writeText(generatedPass.textContent);
   } catch (error) {
      console.error('Failed to copy', error);
   }
}

const copyButtonHandler = () => {
   // Listen to click on copy button
   copyPass.addEventListener('click', () => {
      // If password was generated copy to clipboard and change tooltip text
      if (passGenerated) {
         copyPassword();
         tooltip.textContent = `Password copied`;
      }
   });
};

// If mouse left copy button, reset tooltip text to default
const resetTooltip = () => {
   if (passGenerated) {
      tooltip.textContent = "Copy to clipboard";
   }
};

// Change range slider color based on input
const slider = () => {
   // Calculate min and max value
   let rangePercent = ((rangeLength.value - rangeLength.min) / (rangeLength.max - rangeLength.min)) * 100;
   // Fill the slider background based on input percentage
   rangeLength.style.background = `linear-gradient(to right, var(--clr-accent) ${rangePercent}%, var(--clr-main-darker) ${rangePercent}%)`;
};


init();