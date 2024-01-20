const fileInput = document.querySelector('.upload__img')
const previewImage = document.querySelector('.img__holder img')
const imageHolder = document.querySelector('.img__holder')
const filterOptions = document.querySelectorAll('.toolbar__item')
const paragraphOptions = document.querySelectorAll('.paragraph__mode')
const rotateOptions = document.querySelectorAll('.rotate__mode')
const secondTool = document.querySelectorAll('.second__toolbar-2')
const btnRemoveImg = document.querySelector('.btn__remove')
const sliderTool = document.querySelector(".selected__tool")
const sliderValue = document.querySelector(".selected__value")
const filterSlider = document.getElementById('main-slider')
const btnReset = document.querySelector('.btn__reset')
const rotateList = document.querySelector('.rotate__list')
const rotateItem = document.querySelector('.rotate__items')
const textList = document.querySelector('.text__list')
const textItem = document.querySelector('.text__items')
const sliderContainer = document.querySelector('.slider__container')
const description = document.querySelectorAll('.description')

let activeFilter = '';

let brightness = 100,
    blurs = 0,
    grayscale = 0,
    hue = 0,
    saturation = 100,
    inversion = 0,
    contrast = 100,
    opacity = 1,
    sepia = 0;

let rotate = 0, flipHorizontal = 1, flipVertical = 1;

let text = '',
    textColor = 0,
    textItalic = '',
    textBold = 0,
    textUnderline = '',
    textParagraphMode = '';



const applyFilter = () => {
    previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
    previewImage.style.filter = `brightness(${brightness}%) blur(${blurs}px)  grayscale(${grayscale}%) hue-rotate(${hue}deg)  saturate(${saturation}%) invert(${inversion}%) opacity(${opacity}) contrast(${contrast}%) sepia(${sepia}%)`
};




const loadImage = () => {
    let file = fileInput.files[0];

    if (!file) {
        imageHolder.setAttribute('visibility', "false")
        return;
    }

    // change to see image container 
    imageHolder.setAttribute('visibility', "true")
    previewImage.src = URL.createObjectURL(file);

    // enable tools
    previewImage.addEventListener('load', () => {
        document.querySelector('.tools').classList.remove('disabled')
        document.querySelector('.toolbar').classList.remove('disabled')
    })
}
fileInput.addEventListener('change', loadImage)



// remove image
btnRemoveImg.addEventListener('click', () => {
    fileInput.files[0] = null;
    alert()
    loadImage;
})


// select filters
filterOptions.forEach(option => {
    option.addEventListener('click', () => {
        let position = 3;

        for (i = 0; i < filterOptions.length; i++) {

            filterOptions[i].className = 'toolbar__item'
        }
        option.classList.add('active')


        for (i = 0; i < rotateOptions.length; i++) {
            rotateOptions[i].className = 'toolbar__item-2 rotate__mode'
        }

        for (i = 0; i < filterOptions.length; i++) {
            if (filterOptions[i].className === 'toolbar__item active') {
                position = i
            }
        }

        activeFilter = option.textContent.trim()//get text from div block

        //show filter option text
        description.forEach(des => {
            for (i = 0; i < description.length; i++) {
                description[i].className = 'description'
            }
            description[position].classList.add('show')


        })

        rotateList.classList.remove('show')
        textList.classList.remove('show')
        sliderContainer.setAttribute('Visibility', 'true')

        update(activeFilter)
    })
})


const update = (activeFilter) => {
    sliderTool.innerHTML = activeFilter
    filterSlider.step = "1"

    if (activeFilter === "Brightness") {
        filterSlider.max = '200'
        filterSlider.value = `${brightness}`
        sliderValue.innerHTML = `${brightness}%`
    } else if (activeFilter === "Blur") {
        filterSlider.max = '10'
        filterSlider.step = ".5"
        filterSlider.value = `${blurs}`
        sliderValue.innerHTML = `${blurs}px`
    } else if (activeFilter === "Hue") {
        filterSlider.max = '360'
        filterSlider.value = `${hue}`
        sliderValue.innerHTML = `${hue} deg`
    } else if (activeFilter === "GrayScale") {
        filterSlider.max = '100'
        filterSlider.value = `${grayscale}`
        sliderValue.innerHTML = `${grayscale}%`
    } else if (activeFilter === "Saturation") {
        filterSlider.max = '200'
        filterSlider.value = `${saturation}`
        sliderValue.innerHTML = `${saturation}%`
    } else if (activeFilter === 'Inversion') {
        filterSlider.max = '100'
        filterSlider.value = `${inversion}`
        sliderValue.innerHTML = `${inversion}%`
    } else if (activeFilter === 'Contrast') {
        filterSlider.max = '100'
        filterSlider.value = `${contrast}`
        sliderValue.innerHTML = `${contrast}%`
    } else if (activeFilter === 'Opacity') {
        filterSlider.max = '1'
        filterSlider.step = ".05"
        filterSlider.value = `${opacity}`
        sliderValue.innerHTML = `${opacity}`
    } else if (activeFilter === 'Sepia') {
        filterSlider.max = '100'
        filterSlider.value = `${sepia}`
        sliderValue.innerHTML = `${sepia}%`
    } else if (activeFilter === 'Text') {
        textList.classList.add('show')
        sliderContainer.setAttribute('Visibility', 'false')
    } else if (activeFilter === 'Rotate') {
        sliderContainer.setAttribute('Visibility', 'false')
        rotateList.classList.add('show')
    }
}

// paragraph mode for text
paragraphOptions.forEach(option => {
    option.addEventListener('click', () => {
        for (i = 0; i < paragraphOptions.length; i++) {
            paragraphOptions[i].className = 'paragraph paragraph__mode'
        }
        option.classList.add('stay__active')

        if (option.id === 'align_left') {
            textParagraphMode = ''
        } else if (option.id === 'align_right') {

        } else if (option.id === 'align_center') {

        } else if (option.id === 'align_justify') {

        }


    })
})


//show rotating options
rotateItem.addEventListener('click', () => {
    rotateList.classList.add('show');
    sliderContainer.setAttribute('Visibility', 'false')
})
rotateOptions.forEach(option => {
    option.addEventListener('click', () => {
        for (i = 0; i < rotateOptions.length; i++) {
            rotateOptions[i].className = 'toolbar__item-2 rotate__mode'
        }
        option.classList.add('stay__active')

        if (option.id === 'flip__left') {
            rotate -= 90
        } else if (option.id === 'flip__right') {
            rotate += 90
        } else if (option.id === 'flip__vertical') {
            flipVertical = flipVertical === 1 ? -1 : 1
        } else if (option.id === 'flip__horizontal') {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1
        }

        applyFilter();
    })
})





textItem.addEventListener('click', () => {
    textList.classList.add('show');
    sliderContainer.setAttribute('Visibility', 'false')
})



// update slider value
filterSlider.addEventListener('input', () => {
    sliderValue.innerHTML = `${filterSlider.value}%`

    if (activeFilter === "Brightness") {
        brightness = filterSlider.value
    } else if (activeFilter === "Blur") {
        sliderValue.innerHTML = `${filterSlider.value}px`
        blurs = filterSlider.value
    } else if (activeFilter === "Hue") {
        sliderValue.innerHTML = `${filterSlider.value} deg`
        hue = filterSlider.value
    } else if (activeFilter === "GrayScale") {
        grayscale = filterSlider.value
    } else if (activeFilter === "Saturation") {
        saturation = filterSlider.value
    } else if (activeFilter === 'Inversion') {
        inversion = filterSlider.value
    } else if (activeFilter === 'Contrast') {
        contrast = filterSlider.value
    } else if (activeFilter === 'Opacity') {
        sliderValue.innerHTML = `${filterSlider.value}`
        opacity = filterSlider.value
    } else if (activeFilter === 'Sepia') {
        sepia = filterSlider.value
    }

    applyFilter();
})



//reset all filters
btnReset.addEventListener('click', () => {
    brightness = 100
    blurs = 0
    grayscale = 0
    hue = 0
    saturation = 100
    inversion = 0
    opacity = 1
    contrast = 100
    sepia = 0

    for (i = 0; i < filterOptions.length; i++) {
        filterOptions[i].className = 'toolbar__item'
    }

    description[0].classList.add('show')
    filterOptions[0].classList.add('active')
    applyFilter();
    update("Brightness")
})

