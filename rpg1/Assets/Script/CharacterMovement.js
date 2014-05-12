#pragma strict

//Public var
var speed: float;
var speedRun: float;
var speedRotate: float;
var jumpSpeed: float;

//Private var
private var controller: CharacterController;
private var moveDirection: Vector3;
private var characterContent: Transform;
private var runAnim: boolean;

function Start () {
	controller = GetComponent("CharacterController");
	characterContent = transform.Find("Perso");
}

function Update () {
	//On ne cours pas
	runAnim = false;

	if (controller.isGrounded){
		//Deplacements Haut/Bas
		if (Input.GetKey(KeyCode.LeftShift) || Input.GetKey(KeyCode.RightShift)){
			moveDirection = Vector3(0, 0, Input.GetAxis("Vertical") * speedRun);	
			runAnim = true;
		}else{
			moveDirection = Vector3(0, 0, Input.GetAxis("Vertical") * speed);
		}

		//Gestion de l'animation
		if (Input.GetKey(KeyCode.UpArrow) || Input.GetKey(KeyCode.DownArrow)){
			if (!runAnim){
				characterContent.animation.CrossFade("walk", 0.2);
			}else{
				characterContent.animation.CrossFade("run", 0.2);
			}
		}else{
			characterContent.animation.CrossFade("idle", 0.2);
		}

		if (Input.GetKey(KeyCode.Space)){
			moveDirection.y = jumpSpeed;
			characterContent.animation.CrossFade("jump", 0.2);
		}
	}

	//Changer sur l'axe local
	moveDirection = transform.TransformDirection(moveDirection);	

	//Rotation du personnage
	transform.Rotate(Vector3(0, Input.GetAxis("Horizontal") * speedRotate * Global.deltaTime, 0));

	//Gravity
	moveDirection.y -= Global.gravity * Global.deltaTime;

	//Deplacement du Character Controller
	controller.Move(moveDirection * Global.deltaTime);
}