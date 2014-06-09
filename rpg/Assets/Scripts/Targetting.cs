using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Targetting : MonoBehaviour {
	public List<Transform> targets;
	public Transform selectedTarget = null;

	private Transform myTransform;

	// Use this for initialization
	void Start () {
		targets = new List<Transform>();
		myTransform = transform;

		AddAllEnemies();
	}
	
	public void AddAllEnemies() {
		GameObject[] go = GameObject.FindGameObjectsWithTag("Enemy");

		foreach (GameObject enemy in go)
			AddTarget(enemy.transform);
	}

	public void AddTarget(Transform enemy) {
		targets.Add(enemy);
	}

	public void SortTargetByDistance() {
		targets.Sort(delegate(Transform t1, Transform t2) { 
			return Vector3.Distance(t1.position, myTransform.position).CompareTo(Vector3.Distance(t2.position, myTransform.position));
			});
	}

	public void TargetEnemy() {
		if (selectedTarget == null) {
			SortTargetByDistance();
			selectedTarget = targets[0];
		}
		else {
			int index = targets.IndexOf(selectedTarget);

			if (index < targets.Count - 1) {
				index++;
			}
			else {
				index = 0;
			}
			DeselectTarget();
			selectedTarget = targets[index];
		}
		SelectTarget();
	}

	private void SelectTarget() {
		selectedTarget.renderer.material.color = Color.red;

		PlayerAttack pa = (PlayerAttack)GetComponent("PlayerAttack");

		pa.target = selectedTarget.gameObject;
	}

	public void DeselectTarget() {
		selectedTarget.renderer.material.color = Color.blue;
		selectedTarget = null;
	}

	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown(KeyCode.Tab)) {
			TargetEnemy();
		}
	}
}
