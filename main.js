import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier2d-compat';


export default function run_simulation() {
    let app = new PIXI.Application({ width: 640, height: 360 });
    document.body.appendChild(app.view);
    
    let gravity = new RAPIER.Vector2(0.0, -9.81);
    let world = new RAPIER.World(gravity);
/**
    // Create Ground.
    let groundSize = 40.0;
    let grounds = [
        {x: 0.0, y: 0.0, hx: groundSize, hy: 0.1},
        {x: -groundSize, y: groundSize, hx: 0.1, hy: groundSize},
        {x: groundSize, y: groundSize, hx: 0.1, hy: groundSize},
    ];
    
    grounds.forEach((ground) => {
        let bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(
            ground.x,
            ground.y,
        );
        let body = world.createRigidBody(bodyDesc);
        let colliderDesc = RAPIER.ColliderDesc.cuboid(ground.hx, ground.hy);
        world.createCollider(colliderDesc, body);
    });
     */
    // Dynamic cubes.
    let num = 20;
    let numy = 50;
    let rad = 1.0;
    
    let shift = rad * 2.0 + rad;
    let centerx = shift * (num / 2);
    let centery = shift / 2.0;
    
    let i, j;
    
    for (j = 0; j < numy; ++j) {
        for (i = 0; i < num; ++i) {
            let x = i * shift - centerx;
            let y = j * shift + centery + 3.0;
    
            // Create dynamic cube.
            let bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(x, y);
            let body = world.createRigidBody(bodyDesc);
            let colliderDesc = RAPIER.ColliderDesc.cuboid(rad, rad);
            world.createCollider(colliderDesc, body);
        }
    }
    

    const renderer = new PIXI.Renderer();
    const scene = new PIXI.Container();

    function render(world){
        var objects = new PIXI.Graphics();
        //objects.clear();
        world.forEachCollider((elt)=>{
            let translation = elt.translation();
            //let rotation = elt.rotation();
            objects.beginFill(0xff0000);
            objects.drawRect(translation.x+200, -translation.y+100, 1, 1);
        })

        app.stage.addChild(objects);
        renderer.render(scene);
    }
    
    let gameLoop = () => {
        console.log("in gameloop")
        // Ste the simulation forward.  
        world.step();
        render(world);
    
        setTimeout(gameLoop, 16);
    };
    console.log(world);
    gameLoop();
    
    
}

RAPIER.init().then(run_simulation);