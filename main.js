// const { fabric } = require("./fabric");

// 修改画布大小
var html = document.getElementById('canvas')
html.width = document.body.offsetWidth;
html.height = document.body.offsetHeight;

// 创建画布object
const canvas = new fabric.Canvas('canvas');

// 背景渲染
var background = new fabric.Rect({
    top: 0,
    left: 0,
    width: html.width,
    height: html.height,
    fill: 'red',
});
// 背景渐变集合
var gradients = [
    new fabric.Gradient({
        type: 'linear',
        gradientUnits: 'pixels', // or 'percentage'
        coords: { x1: 0, y1: 0, x2: 0, y2: background.height },
        colorStops:[
        { offset: 0, color: '#ba0000' },
        { offset: 1, color: '#440606'}
        ]
    }),
    new fabric.Gradient({
        type: 'linear',
        gradientUnits: 'pixels', // or 'percentage'
        coords: { x1: 0, y1: 0, x2: 0, y2: background.height },
        colorStops:[
        { offset: 0, color: '#006eff' },
        { offset: 1, color: '#00d0ff'}
        ]
    })];
background.set('fill', gradients[1]);

// 左边加条子
var BarRight = 70;
var bar = new fabric.Rect({
    top: 0,
    left: 0,
    width: BarRight,
    height: html.height,
    fill: 'red',
  });
var gradient = new fabric.Gradient({
    type: 'linear',
    gradientUnits: 'pixels', // or 'percentage'
    coords: { x1: 0, y1: 0, x2: 0, y2: background.height },
    colorStops:[
      { offset: 0, color: '#e2b50f' },
      { offset: 1, color: '#fdff90'}
    ]
  });
bar.set('fill', gradient);


// 画dot边框
function dotline(r, dot_r, angle_step, x, y) {
    var ang2rad = Math.PI / 180;
    var rad_step = angle_step * ang2rad;
    var rad_start = 0;
    var rad_end = 2 * Math.PI;
    var dots = [];
    for(i = rad_start; i < rad_end; i += rad_step) {
        var dot = new fabric.Circle({
            radius: dot_r,
            fill: '#7cb9ef',
            left: Math.cos(i) * r,
            top: Math.sin(i) * r
        });
        dots.push(dot);
    }
    var group = new fabric.Group(dots, {
        left: x,
        top: y
    });
    return group;
};
var Dotline_pos = {'x': BarRight + 100, 'y': html.height - 150};
var Dotline = dotline(700, 10, 5, Dotline_pos.x, Dotline_pos.y);


//让边框动起来
// Dotline.centeredRotation = true;
Dotline.originX = 'center';
Dotline.originY = 'center';
function straightEase(t, b, c, d) {
	return c*t / d;
};
function DotlineAnimate() {
    Dotline.animate('angle', '+=10',  { 
        duration: 1000,
        easing: straightEase,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: DotlineAnimate
    });
}
DotlineAnimate();

//上字
var SongList = new fabric.Text("SONG LIST", {
    fill: '#e2b50f',
    fontFamily: 'Arial Black',
    fontWeight: 'bold',
    left: BarRight,
    top: 20,
    fontSize: 64,
    scaleY: 0.7
});



//加歌曲列表
function SongBar(big_color, small_color, x, y) {
    var buffer = [];

    buffer.push(new fabric.Rect({
        fill: big_color,
        left: 0,
        top: 300,
        width: 600,
        height: 80
    }));
    
    buffer.push(new fabric.Rect({
        fill: small_color,
        left: 15,
        top: 320,
        width: 40,
        height: 40
    }));
    var group = new fabric.Group(buffer, {
        left: x,
        top: y
    });
    return group;
}
var bar1_pos = {'x': 0, 'y': 200};
var bar2_pos = {'x': 0, 'y': 300};
var SongBar1 = SongBar('#062043', '#e2b50f', bar1_pos.x, bar1_pos.y);
var SongBar2 = SongBar('#ffffff00', '#062043', bar2_pos.x, bar2_pos.y);


//上歌曲名
var SongName1 = new fabric.Text("Mass Destruction", {
    fill: '#ffffff',
    fontFamily: 'Arial Black',
    fontWeight: 'normal',
    left: BarRight,
    top: bar1_pos.y + 20,
    fontSize: 36,
});
var SongName2 = new fabric.Text("Mass Destruction", {
    fill: '#062043',
    fontFamily: 'Arial Black',
    fontWeight: 'normal',
    left: BarRight,
    top: bar2_pos.y + 20,
    fontSize: 36,
});
var SongName2_add = new fabric.Text("p3f -version-", {
    fill: '#062043',
    fontFamily: 'Arial Black',
    fontWeight: 'normal',
    left: BarRight + 360,
    top: bar2_pos.y + 25,
    fontSize: 24,
});
var Persona = new fabric.Text("Persona", {
    fill: '#0a32628e',
    fontFamily: 'Arial Black',
    fontWeight: 'normal',
    left: 1550,
    top: 0,
    angle: 90,
    fontSize: 114,
    scaleX: 1.3
});

//加人物
var characters = []
var shadows = []
fabric.Image.fromURL('./lan.png', function(img) {

    // add filter
    img.filters.push(new fabric.Image.filters.Brightness({ brightness: -100 }));
  
    // apply filters and re-render canvas when done
    img.applyFilters();
    img.scale(0.5);
    img.set('top', 0);
    img.set('left', 700);
    // add image onto canvas (it also re-render the canvas)
    canvas.add(img);
  });


fabric.Image.fromURL('./lan.png', function(img) {

    // add filter
    img.filters.push(new fabric.Image.filters.Grayscale());

    // apply filters and re-render canvas when done
    img.applyFilters();
    img.scale(0.5);
    img.set('left', 750);
    // add image onto canvas (it also re-render the canvas)
    canvas.add(img);
});

//整理顺序
canvas.add(background);
canvas.add(Dotline);
canvas.add(bar);
canvas.add(SongList);
canvas.add(SongBar1);
canvas.add(SongBar2);
canvas.add(SongName1);
canvas.add(SongName2);
canvas.add(SongName2_add);
canvas.add(Persona);





