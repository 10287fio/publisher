const Tools = (): JSX.Element => {
    function toolsClickEventListener(e:React.MouseEvent<HTMLButtonElement>) {
    }

    return (
        <div>
            <button id="line" onClick={toolsClickEventListener}>Line</button>
            &nbsp;
            <button id="arc" onClick={toolsClickEventListener}>Arc</button>
            &nbsp;
            <button id="triangle" onClick={toolsClickEventListener}>Triangle</button>
            &nbsp;
            <button id="quadrangle" onClick={toolsClickEventListener}>Quadrangle</button>
            &nbsp;
            <button id="sector" onClick={toolsClickEventListener}>Sector</button>
            &nbsp;
            <button id="circle" onClick={toolsClickEventListener}>Circle</button>
        </div>
    );
};

export default Tools;