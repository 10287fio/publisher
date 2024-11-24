import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import Reservecanvas from '@/component/canvas/Reservecanvas';
import Drawcanvas from '@/component/canvas/Drawcanvas';
import Resultcanvas from '@/component/canvas/Resultcanvas';

const Sketchbook = (props: any): JSX.Element => {
    return (
        <div className={sketchbookStyle.canvasContainer}>
            <Reservecanvas/>
            <Drawcanvas/>
            <Resultcanvas/>
        </div>
    )
};

export default Sketchbook;