import canvasStyle from '@/component/canvas/Canvas.module.scss';
import Pathcanvas from '@/component/canvas/Pathcanvas';
import Drawcanvas from '@/component/canvas/Drawcanvas';
import Resultcanvas from '@/component/canvas/Resultcanvas';

const Sketchbook = (props: any): JSX.Element => {
    return (
        <div className={canvasStyle.container}>
            <Pathcanvas/>
            <Drawcanvas/>
            <Resultcanvas/>
        </div>
    )
};

export default Sketchbook;