import Palette from './Palette.js';
import * as Const from './constants.js';

export default class Sprite {
    constructor(src, layer_order = 1) {

        this.layer_id = Math.floor(Math.random() * 1000);
        this.layer = document.createElement('canvas');
        this.layer.height = Const.TRGT_HEIGHT;
        this.layer.width = Const.TRGT_WIDTH;
        this.layer
        this.order = layer_order;
        this.ctx = this.layer.getContext("2d");
        this.ctx.imageSmoothingEnabled = false; 
                this.src = src;       
        this.img = new Image();
        this.img.src = src;
        this.palette = new Palette();

        /*        let id = this.layer_id;
                let layer = this.layer;
                let ctx = this.ctx;
                let img = this.img;
                let palette = this.palette;
                let drawScaled = this.drawScaled;*/
        let current_self = this;
        this.img.addEventListener("load", function() {
            //console.log(current_self);
            current_self.drawScaled(current_self);
        })
        document.getElementById('canvases').append(this.layer);
    }

    edit(src, canvas, params = false) {
        this.palette.setParams(params);
        //console.log(this.order, params);
        this.ctx.clearRect(0, 0, Const.TRGT_WIDTH, Const.TRGT_HEIGHT);
        let self = this;
        this.img = new Image();
        this.img.src = src;
        //console.log(src);
        self = this;
        this.img.addEventListener("load", function() {
            self.drawScaled(self);
            self.palette.setBase(self.ctx, self.img.naturalWidth * Const.SCALE, self.img.naturalHeight * Const.SCALE);

            window.setTimeout(function() {
                let newImage = self.palette.getNewImage();
                self.ctx.putImageData(newImage, 0, 0);
                let local_ctx = canvas.getContext("2d");
                local_ctx.drawImage(self.layer, 0, 0);
            }, Const.DELAY / 2);

        }, false);
    }

    noBg() {

        /*
        window.setTimeout(function() {
            let newImage = self.palette.getNoBgImage();
            self.ctx.putImageData(newImage, 0, 0);
        }, Const.DELAY / 2);*/
    }

    clear() {
        this.ctx.clearRect(0, 0, Const.TRGT_WIDTH, Const.TRGT_HEIGHT);
    }

    normalize(canvas) {
        let self = this;
        window.setTimeout(function() {
            canvas.width = self.layer.width;
            canvas.height = self.layer.height
        }, Const.DELAY);
    }

    render_to_save(canvas) {
        let self = this;
        window.setTimeout(function() { self._render_to_save(canvas) }, Const.DELAY);
    }

    _render_to_save(canvas) {
        console.log(this.src);
        let local_ctx = canvas.getContext("2d");
        local_ctx.drawImage(this.layer, 0, 0);
    }

    drawScaled(current_self) {
        current_self.layer.height = current_self.img.naturalHeight * Const.SCALE;
        current_self.layer.width = current_self.img.naturalWidth * Const.SCALE;
        current_self.ctx.imageSmoothingEnabled = false;
        current_self.ctx.drawImage(current_self.img, 0, 0, current_self.img.naturalWidth * Const.SCALE, current_self.img.naturalHeight * Const.SCALE);

        ////
        window.setTimeout(function() {
            //console.log(current_self.layer_id);
            current_self.ctx = current_self.layer.getContext("2d");
            current_self.palette.setBase(current_self.ctx, current_self.layer.width, current_self.layer.height);

        }, Const.DELAY);


        let newImage = current_self.palette.getNoBgImage(current_self.ctx, Const.TRGT_WIDTH * Const.SCALE, Const.TRGT_HEIGHT * Const.SCALE);
        current_self.ctx.putImageData(newImage, 0, 0);
        ////

        //current_self.ctx.drawImage(current_self.img, 0, 0, current_self.img.naturalWidth * Const.SCALE, current_self.img.naturalHeight * Const.SCALE);
    }

    setSelfBg(color = "transparent") {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, Const.TRGT_WIDTH, Const.TRGT_HEIGHT);
    }

    setBg(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(0, 0, Const.TRGT_WIDTH, Const.TRGT_HEIGHT)
    }

    test() {
        alert(1);
    }
}