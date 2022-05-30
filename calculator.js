let runningTotal = 0;
let buffer = "0";
let previousOper = null;

const screen = document.querySelector(".screen");

bt = document.querySelector(".calc-buttons");

bt.addEventListener("click", function(event)
{   
    console.log(event.target.innerText); 
    buttonClick(event.target.innerText);
});

    function buttonClick(value)
    {
        
        if(isNaN(parseInt(value)))
        {
            handleSymbol(value);
        }
        else
        {
            handleNumber(value);
        }

        rerender();
    }

    function handleNumber(value)
    {
        if(buffer === "0")
        {
            //if buffer is empty then add number
            buffer = value;
        }
        else
        {
            //if buffer has number then append curr number
            buffer+=value;
        }
       rerender();
    }

    function handleSymbol(value)
    {
        switch(value)
        {
            case 'C':
                buffer = "0";
                runningTotal = 0;
                previousOper = null;
                
                break;
            
            case "=":
                if(previousOper === null)
                {
                    return;
                }
                doOper(parseInt(buffer));
                previousOper = null;
                buffer = runningTotal;
                runningTotal = 0;
                break;

            case "←":
                if(buffer.length === 1){
                    buffer = "0";
                }
                else
                {
                    buffer = buffer.substring(0,buffer.length-1);
                }
                break;
            default:
                handleMath(value);
                break;
        }
    }
    
    

    function rerender()
    {
        //becuause we are showing number as we type
        screen.innerText = buffer;
    }

    function handleMath(value)
    {
        const intBuffer = parseInt(buffer);
        if(runningTotal === 0)
        {
            runningTotal = intBuffer;
        }
        else
        {
            doOper(intBuffer);
        }

        previousOper = value;
        buffer = "0";
    }

    function doOper(intBuffer)
    {
        if(previousOper === "+")
        {
            runningTotal+=intBuffer;
        }
        else if(previousOper == "-")
        {
            runningTotal-=intBuffer;
        }
        else if(previousOper == "×")
        {
            runningTotal*=intBuffer;
        }
        else
        {
            runningTotal/=intBuffer;
        }
    }

