window.addEventListener("load", () => {
    /* ========== Variables y obj generales ========== */

    const app = document.querySelector("#app");
    const numInput = document.querySelector("#num-input");

    const config = {
        characters: parseInt(numInput.value), // parseInt es para convertir numeros string en numeros
        symbols: true,
        numbers: true,
        caps: true,
        lowers: true,
    };

    const characters = {
        numbers: "0 1 2 3 4 5 6 7 8 9",
        symbols: "! @ # 4 % ^ & * ( ) - _ = + - * / . , : ; < > ? [ ] { }",
        caps: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
        lowers: "a b c d e f g h i j k l m n o p q r s t u v w x y z",
    };

    /* ========== Eventos ========== */

    app.addEventListener("submit", (e) => e.preventDefault());

    const plusBtn = document.querySelector("#plus-btn");
    const minusBtn = document.querySelector("#minus-btn");

    const copyAlert = document.querySelector("#copy-alert");
    const passBox = document.querySelector("#pass-box");

    // Config characters number

    plusBtn.addEventListener("click", () => {
        if (config.characters < 20) {
            config.characters++;
            numInput.value = config.characters;
        }
    });

    minusBtn.addEventListener("click", () => {
        if (config.characters > 4) {
            config.characters--;
            numInput.value = config.characters;
        }
    });

    // Config characters type

    const symbolBtn = document.querySelector("#symbol-btn");
    const numberBtn = document.querySelector("#number-btn");
    const capitalBtn = document.querySelector("#capital-btn");
    const controlBtn = document.querySelectorAll(".control-btn");

    symbolBtn.addEventListener("click", function () {
        btnToggle(this);
        config.symbols = !config.symbols;
    });

    numberBtn.addEventListener("click", function () {
        btnToggle(this);
        config.numbers = !config.numbers;
    });

    capitalBtn.addEventListener("click", function () {
        btnToggle(this);
        config.caps = !config.caps;
    });

    // Generate password button
    const generateBtn = document.querySelector("#generate-btn");
    const generateInput = document.querySelector("#generate-input");

    generateBtn.addEventListener("click", () => {
        generatePass();
    });

    // Copy password

    generateInput.addEventListener("click", () => {
        copyPassword();
    });

    /* ========== Funciones ========== */

    // Check characters type

    const btnToggle = (element) => {
        element.classList.toggle("false");
        element.childNodes[0].classList.toggle("fa-check");
        element.childNodes[0].classList.toggle("fa-times");
    };

    // Generate password

    const generatePass = () => {
        let finalCharacters = "";
        let password = "";

        for (props in config) {
            if (config[props] == true) {
                finalCharacters += characters[props] + " "; // += es para sumar y despues de igualar en un ciclo
            }
        }

        finalCharacters = finalCharacters.trim(); // trim() quita los espacios en blanco al inicio y final
        finalCharacters = finalCharacters.split(" ");

        for (let i = 0; i < config.characters; i++) {
            password +=
                finalCharacters[
                    Math.floor(Math.random() * finalCharacters.length)
                ];
        }

        // Show new password
        generateInput.value = password;

        // Animate button
        generateBtn.classList.add("animate");
        setTimeout(function () {
            generateBtn.classList.remove("animate");
        }, 1000);
    };

    const copyPassword = () => {
        generateInput.select(); // select()
        document.execCommand("copy"); // para copiar.
        copyAlert.classList.add("active");

        setTimeout(function () {
            copyAlert.classList.remove("active");
        }, 2000);
    };

    // Generate input animation
    passBox.addEventListener("mouseenter", function (e) {
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        let ripples = document.createElement("span");
        ripples.style.left = x + "px";
        ripples.style.top = y + "px";
        this.appendChild(ripples);
        setTimeout(() => {
            ripples.remove();
        }, 1000);
    });

    generatePass();
});
