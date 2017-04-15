class DragMe {

    constructor(elements) {
        this.elements = Array.from(elements);

        this.onDragStart = this.onDragStart.bind(this);
        this.onDraging = this.onDraging.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);

        this.dragCanceled = false;
        this.mouseDownCount = 0;
    }

    initalize() {
        document.documentElement.addEventListener('mousedown', this.onDragStart, false);
        document.documentElement.addEventListener('mousemove', this.onDraging, false);
        document.documentElement.addEventListener('mouseup', this.onDragEnd, false);
    }

    start() {
        this.initalize();
    }

    stop() {
        document.documentElement.removeEventListener('mousedown', this.onDragStart, false);
        document.documentElement.removeEventListener('mousemove', this.onDraging, false);
        document.documentElement.removeEventListener('mouseup', this.onDragEnd, false);
    }

    onDragStart(e) {
        e.preventDefault();

        const target = e.target; // TODO: bubble in path
        this.dragCanceled = false;

        if (this.elements.includes(target)
                && this.mouseDownCount === 0) {
            this.mouseDownCount += 1;
            console.log('dragStart()');

            target.translatedY = target.translatedY || 0;
            this.target = target;
            this.dragstartY = e.clientY;
            this.isDraging = true;
        } else {
            this.isDraging = false;
            return false;
        }
    }

    onDraging(e) {
        e.preventDefault();
        let y = parseFloat(e.clientY);

        if (this.mouseDownCount !== 1) {
            this.isDraging = false;
        }

        if (this.isDraging
                && !this.dragCanceled
                && (y > (this.dragstartY)
                    || y < (this.dragstartY))) {
            this.dragCanceled = false;
            console.log('draging()');
            const _this = this;

            let newY = (y - this.dragstartY);

            // if (newY < 0) {
            //     this.dragCanceled = true;
            //     return;
            // }

            window.requestAnimationFrame(() => {
                _this.target.style.transform = `translate3d(0,${newY + this.target.translatedY}px,0)`;
            });
        }
    }

    onDragEnd(e) {
        if (this.mouseDownCount > 0) {
            e.preventDefault();
            console.log('dragEnd()');

            let newY = e.clientY - this.dragstartY;

            this.target.translatedY = newY + this.target.translatedY;

            this.draging = false;
            this.dragCanceled = true;
            this.mouseDownCount = 0;
            this.translatedY = 0;
        }
    }
}

let drag = new DragMe(document.querySelectorAll('li'));
drag.initalize();
