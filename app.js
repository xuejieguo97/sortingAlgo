document.addEventListener('DOMContentLoaded',() => {
    const displayGrid = document.querySelector('.display-grid')
    const generateButton = document.querySelector('#generate')
    const slider = document.getElementById("myRange");
    const bubblesortButton = document.getElementById("BubbleSort")
    const selectionSortButton = document.getElementById("SelectionSort")
    const mergeSortButton = document.getElementById("MergeSort")
    const quickSortButton = document.getElementById("QuickSort")
    const resetButton = document.getElementById("reset")
    let prevGrid = ""

    generateButton.addEventListener('click', generate)
    function generate(){
        const n = slider.value;
        displayGrid.innerHTML = ""
        for(let i = 0; i < n; i++){
            const num = document.createElement('div')
            num.classList.add("block")

            const height = Math.random() * 100
            num.style.height = `${height * 5}px`
            num.style.width = `${90/n}%`
            num.style.transform = `translate(${90 * i/n}%) `
            num.dataset.height = height
            displayGrid.appendChild(num)
        }
        prevGrid = displayGrid.innerHTML
        return 
    }

    resetButton.addEventListener('click', reset)
    function reset(){
        if(prevGrid === ""){
            generate();
        }else{
            displayGrid.innerHTML = prevGrid
        }
    }

    function swap(el1, el2){
        return new Promise((resolve) => {
            let temp = el1.style.height
            let tempHeight = el1.dataset.height
            window.requestAnimationFrame(function(){
                setTimeout(() => {
                    el1.dataset.height = el2.dataset.height
                    el2.dataset.height = tempHeight
                    el1.style.height = el2.style.height
                    el2.style.height = temp
                    resolve()
                }, 150)
            })

        })
    }


    function forbid(flag){
        const buttons = document.querySelectorAll('.btn')
        if(flag){
            buttons.forEach(element => {
                element.style.color = "grey"
                element.disabled = true
            })
        }else{
            buttons.forEach(element => {
                element.style.color = "#6190ac"
                element.disabled = false
            })
        }
        reset.disabled = false
    }


    bubblesortButton.addEventListener('click', bbSort)

    async function bbSort(){
        forbid(true)
        
        let blocks = document.querySelectorAll(".block");

        for(let i = 0; i < blocks.length; i++){
            for(let j = 0; j < blocks.length-i-1; j++){
                
                blocks[j].style.backgroundColor = "#76B3D6"
                blocks[j+1].style.backgroundColor = "#76B3D6"

                await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 150)
                );

                let value1 = Number(blocks[j].dataset.height)
                let value2 = Number(blocks[j+1].dataset.height)

                if(value1 > value2){
                    await swap(blocks[j], blocks[j+1])
                    blocks = document.querySelectorAll(".block")
                }
                blocks[j].style.backgroundColor = "#f3f3f3"
                blocks[j+1].style.backgroundColor = "#f3f3f3"
            }

            blocks[blocks.length - 1 - i].style.backgroundColor = "#3d82ac"
    
        }
        forbid(false)
        return
    }


    function changeHeight(el1, h){
        return new Promise((resolve) => {
            window.requestAnimationFrame(function(){
                setTimeout(() => {
                    el1.dataset.height = h
                    el1.style.height = `${h * 5}px` 
                    resolve()
                }, 150)
            })

        })
    }


    selectionSortButton.addEventListener('click', selectionSort)
    async function selectionSort(){

        forbid(true)
        let blocks = document.querySelectorAll(".block");

        for(let i = 0; i < blocks.length; i++){
            let minValue = Number(blocks[i].dataset.height);
            let index = i;
            blocks[i].style.backgroundColor = "#76B3D6"

            for(let j = i + 1; j < blocks.length; j++){

                blocks[j].style.backgroundColor = "#76B3D6"
                await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 150)
                )

                if(Number(blocks[j].dataset.height) < minValue){
                    minValue = Number(blocks[j].dataset.height)
                    index = j;
                }

                blocks[j].style.backgroundColor = "#f3f3f3"
            }
            // swap
            blocks[index].style.backgroundColor = "#76B3D6"
            await swap(blocks[i], blocks[index])
            blocks = document.querySelectorAll(".block")
            blocks[index].style.backgroundColor = "#f3f3f3"
            blocks[i].style.backgroundColor = "#f3f3f3"
            blocks[i].style.backgroundColor = "#3d82ac"
        }
        forbid(false)
        return 
    }


    mergeSortButton.addEventListener('click', mergeSortFinal)
    let array = []
    let itmd = []
    let visited = []
    let blocks

    async function mergeSortFinal(){
        blocks = document.querySelectorAll(".block")
        forbid(true)
        blocks.forEach(element => {
            array.push(element.dataset.height)
            itmd.push(0)
            visited.push(0)
        })
        await mergeSort(0, array.length - 1)
        forbid(false)
    }


    function merge(start, end){
        let mid = Math.floor((start + end)/2)
        let start1 = start, start2 = mid + 1
        let end1 = mid, end2 = end

        let index = start
        
        while(start1 <= end1 && start2 <= end2){
            if(Number(array[start1]) <= Number(array[start2])){
                itmd[index] = array[start1]
                index = index + 1
                start1 = start1 + 1
            }else{
                itmd[index] = array[start2]
                index = index + 1
                start2 = start2 + 1
            }
        }

        while(start1 <= end1){
            itmd[index] = array[start1]
            index = index + 1
            start1 = start1 + 1
        }
        while(start2 <= end2){
            itmd[index] = array[start2]
            index = index + 1
            start2 = start2 + 1
        }

        index = start
        while(index <= end){
            array[index] = itmd[index]
            index++
        }
    }


    function timeout(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    const mergeSort = async(start, end) => {
        if(start < end){
            let mid = Math.floor((start + end) / 2)
            await mergeSort(start, mid)
            await mergeSort(mid + 1, end)
            await merge(start, end)
            await drawBars(start, end)
            await timeout(250)
        }
    }

    function drawBars(start, end) {

        for(let i = 0; i < visited.length; i++){
            if(visited[i] === 1){
                blocks[i].backgroundColor = "#3d82ac"
            }
        }

        for(let i = start; i <= end; i++){
            blocks[i].style.backgroundColor = "#76B3D6"
            blocks[i].dataset.height = array[i]
            blocks[i].style.height = `${array[i] * 5}px`
            visited[i] = 1
        }
        
    }


    quickSortButton.addEventListener("click", quickSortFinal)

    function quickSortFinal(){
        let blocks = document.querySelectorAll('.block')
        quickSort(blocks, 0, blocks.length-1)
    }

    async function quickSort(arr, l, h){
        if(l >= h) {
            if(l === h) arr[l].style.backgroundColor = "#3d82ac"
            return 
        }
        let q = await partition(arr, l, h)
        quickSort(arr, l, q-1)
        quickSort(arr, q+1, h)
    }

    async function partition(arr, l, h){
        const pivot = Number(arr[h].dataset.height)
        arr[h].style.backgroundColor = "#a163f7"
        let index = l
        let prev
        
        for(let i = l; i < h; i++){

            prev = index
            arr[index].style.backgroundColor = "#76B3D6"
            arr[i].style.backgroundColor = "#76B3D6"

            await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 150)
            )
            if(Number(arr[i].dataset.height) < pivot){
                await swap(arr[index], arr[i])
                index++
            }
            arr[prev].style.backgroundColor = "#f3f3f3"
            arr[i].style.backgroundColor = "#f3f3f3"
        }


        arr[index].style.backgroundColor = "#76B3D6"
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 150)
        )
        await swap(arr[index], arr[h])

        arr[h].style.backgroundColor = "#f3f3f3"
        arr[index].style.backgroundColor = "#3d82ac"

        return index
    }

})




