const fileInput = document.querySelector('.upload__img')
const previewImage = document.querySelector('.img__holder img')
const previewText = document.querySelector('.img__text')
const imageHolder = document.querySelector('.img__holder')
const filterOptions = document.querySelectorAll('.toolbar__item')
const paragraphOptions = document.querySelectorAll('.paragraph__mode')
const rotateOptions = document.querySelectorAll('.rotate__mode')
const secondTool = document.querySelectorAll('.second__toolbar-2')
const btnRemoveImg = document.querySelector('.btn__remove')
const btnApply = document.querySelector('.btn__apply')
const btnCancel = document.querySelector('.btn__cancel')
const btnUnderline = document.querySelector('.btn__underline')
const btnBold = document.querySelector('.btn__bold')
const btnItalic = document.querySelector('.btn__italic')
const sliderTool = document.querySelector(".selected__tool")
const sliderValue = document.querySelector(".selected__value")
const filterSlider = document.getElementById('main-slider')
const opacitySlider = document.getElementById('opacity-slider')
const fontSizelider = document.getElementById('font-size-slider')
const btnReset = document.querySelector('.btn__reset')
const btnExport = document.querySelector('.btn__export')
const rotateList = document.querySelector('.rotate__list')
const rotateItem = document.querySelector('.rotate__items')
const textList = document.querySelector('.text__list')
const textItem = document.querySelector('.text__items')
const sliderContainer = document.querySelector('.slider__container')
const canvas = document.createElement("canvas")
const textContent = document.querySelector('.text__input')
const ColorContent = document.querySelector('.text__color ')
const draggableText = document.querySelector('.img__text')

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
    textColor = '#000000',
    textFontStyle = 'normal',
    textFontWeight = 400,
    textDecoration = 'none',
    textParagraphMode = 'start',
    textFontSize = 16,
    textOpacity = 1;

let offsetX, offsetY;

const applyFilter = () => {
    previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
    previewImage.style.filter = `brightness(${brightness}%) blur(${blurs}px)  grayscale(${grayscale}%) hue-rotate(${hue}deg)  saturate(${saturation}%) invert(${inversion}%) opacity(${opacity}) contrast(${contrast}%) sepia(${sepia}%)`
};

const applyText = (e) => {
    text = textContent.value
    textColor = ColorContent.value

    document.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            document.querySelector('.img__text').appendChild('<br/>')
        }
    })

    previewText.textContent = `${text}`
    previewText.style.color = `${textColor}`
    previewText.style.fontStyle = `${textFontStyle}`
    previewText.style.fontWeight = `${textFontWeight}`
    previewText.style.textDecoration = `${textDecoration}`
    previewText.style.textAlign = `${textParagraphMode}`
    previewText.style.opacity = `${textOpacity}`
    previewText.style.fontSize = `${textFontSize}` + 'px'
}


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
    imageHolder.setAttribute('visibility', "false")
    // previewImage.src = URL.createObjectURL(null);
    document.querySelector('.tools').classList.add('disabled')
    document.querySelector('.toolbar').classList.add('disabled')
    btnReset.click()

    for (i = 0; i < rotateOptions.length; i++) {
        rotateOptions[i].className = 'toolbar__item-2 rotate__mode'
    }
})


// select filters
filterOptions.forEach(option => {
    option.addEventListener('click', () => {


        for (i = 0; i < filterOptions.length; i++) {

            filterOptions[i].className = 'toolbar__item'
        }
        option.classList.add('active')


        for (i = 0; i < rotateOptions.length; i++) {
            rotateOptions[i].className = 'toolbar__item-2 rotate__mode'
        }


        activeFilter = option.textContent.trim()//get text from div block


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
        sliderValue.innerHTML = `${hue} °`
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


opacitySlider.addEventListener('input', () => {
    document.getElementById('opacity-value-return').innerHTML = `${opacitySlider.value}`
    textOpacity = `${opacitySlider.value}`

    applyText()
})


fontSizelider.addEventListener('input', () => {
    document.getElementById('font-size-value-return').innerHTML = `${fontSizelider.value}px`
    textFontSize = `${fontSizelider.value}`

    applyText()
})
// cancel the text information
// btnCancel.addEventListener('click' = () => {


//     // reset parargraph modes 
//     for (i = 0; i < paragraphOptions.length; i++) {
//         paragraphOptions[i].className = 'paragraph paragraph__mode'
//     }


//     text = ''
//     textColor = '#000000'
//     textFontStyle = 'normal'
//     textFontWeight = 1
//     textDecoration = ''
//     textParagraphMode = 'start'

// })

// apply btn for text 
btnApply.addEventListener('click', () => {
    text = document.querySelector('.text__input').textContent
    textColor = document.querySelector('.text__color ').value

    if (text.length < 0) {//check if text field is empty
        alert("Enter Text!")
        return
    }
    applyText()



})

btnItalic.addEventListener('click', () => {
    if (textFontStyle === 'normal') {
        btnItalic.classList.add('stay__active')
        textFontStyle = 'italic'
    } else {
        btnItalic.classList.remove('stay__active')
        textFontStyle = 'normal'
    }
    previewText.style.fontStyle = `${textFontStyle}`
})

btnBold.addEventListener('click', () => {
    if (textFontWeight == 400) {
        btnBold.classList.add('stay__active')
        textFontWeight = 800
    } else {
        btnBold.classList.remove('stay__active')
        textFontWeight = 400
    }
    previewText.style.fontWeight = `${textFontWeight}`
})

btnUnderline.addEventListener('click', () => {
    if (textDecoration === 'none') {
        btnUnderline.classList.add('stay__active')
        textDecoration = 'underline'
    } else {
        btnUnderline.classList.remove('stay__active')
        textDecoration = 'none'
    }
    previewText.style.textDecoration = `${textDecoration}`
})


// paragraph mode for text
paragraphOptions.forEach(option => {
    option.addEventListener('click', () => {
        for (i = 0; i < paragraphOptions.length; i++) {
            paragraphOptions[i].className = 'paragraph paragraph__mode'
        }
        option.classList.add('stay__active')

        if (option.id === 'align_left') {
            textParagraphMode = 'start'
        } else if (option.id === 'align_right') {
            textParagraphMode = 'end'
        } else if (option.id === 'align_center') {
            textParagraphMode = 'center'
        } else if (option.id === 'align_justify') {
            textParagraphMode = 'justify'
        }
        previewText.style.textAlign = textParagraphMode
    })
})

const move = (e) => {
    draggableText.style.left = `${e.clientX - offsetX}px`
    draggableText.style.top = `${e.clientY - offsetY}px`
}
draggableText.addEventListener('mousedown', (e) => {
    offsetX = e.clientX - draggableText.offsetLeft
    offsetY = e.clientY - draggableText.offsetTop
    document.addEventListener('mousemove', move)
})

// draggableText.addEventListener('mousemove', move)

draggableText.addEventListener('mouseup', () => {
    draggableText.removeEventListener('mousedown', move)
    draggableText.removeEventListener('mousemove', move)
})

//show rotating options
rotateItem.addEventListener('click', () => {
    rotateList.classList.add('show');
    sliderContainer.setAttribute('Visibility', 'false')
})
rotateOptions.forEach(option => {
    option.addEventListener('click', () => {

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
        if ((rotate == 360) || (rotate == -360)) {
            rotate = 0
        }
    })
})



//show slider and text values
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
        sliderValue.innerHTML = `${filterSlider.value} °`
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
    rotate = 0
    flipVertical = 1

    for (i = 0; i < filterOptions.length; i++) {
        filterOptions[i].className = 'toolbar__item'
    }

    rotateList.classList.remove('show')
    textList.classList.remove('show')
    sliderContainer.setAttribute('Visibility', 'false')

    document.getElementById("toolbar").scrollTop = 0

    applyFilter();
})


btnExport.addEventListener('click', () => {
    const ctx = canvas.getContext('2d')
    canvas.width = previewImage.naturalWidth
    canvas.height = previewImage.naturalHeight
    ctx.translate(canvas.width / 2, canvas.height / 2)
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180)

        if ((rotate === 90) || (rotate === -90) || (rotate === 270) || (rotate === -270)) {
            canvas.width = previewImage.naturalHeight
            canvas.height = previewImage.naturalWidth
            ctx.translate(canvas.width / 2, canvas.height / 2)
            ctx.rotate(rotate * Math.PI / 180)
            // ctx.translate(canvas.width / 2, canvas.height / 2)
        }
    } else {

    }
    ctx.filter = `brightness(${brightness}%) blur(${blurs}px)  grayscale(${grayscale}%) hue-rotate(${hue}deg)  saturate(${saturation}%) invert(${inversion}%) opacity(${opacity}) contrast(${contrast}%) sepia(${sepia}%)`

    ctx.scale(flipHorizontal, flipVertical)
    ctx.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)

    // ctx.fillStyle = textColor
    // ctx.textAlign = "" + textParagraphMode.value + ""
    ctx.font = '40pt Calibri'
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    document.body.appendChild(canvas)
    const link = document.createElement("a")
    link.download = 'image/jpg'
    link.href = canvas.toDataURL()
    // link.click()

    btnCancel.click()
    btnReset.click()
})


