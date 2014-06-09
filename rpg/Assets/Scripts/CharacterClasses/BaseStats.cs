public class BaseStats {
	private int _baseValue;						// Base value of this stat
	private int _buffValue;						// amount of th buff to this stat
	private int _expToLevel;					// total amount to get next lvl
	private float _levelModifier;				// modifier for xp

	public BaseStats() {
		_baseValue = 0;
		_buffValue = 0;
		_levelModifier = 1.1f;
		_expToLevel = 100;
	}

	// Basic Setters and Getters
	public int BaseValue() {
		get{ return _baseValue; }
		set{ _baseValue = value; }
	}

	private int BuffValue() {
		get{ return _buffValue; }
		set{ _buffValue = value; }
	}

	private int ExpToLevel() {
		get{ return _expToLevel; }
		set{ _expToLevel = value; }
	}

	private float LevelModifier() {
		get{ return _levelModifier; }
		set{ _levelModifier = value; }
	}

	private int CalculateExpToLevel() {
		return (int)(_expToLevel * _levelModifier);
	}

	public void LevelUp() {
		_expToLevel = CalculateExpToLevel();
		_baseValue++;
	}

	public int AdjustedValue() {
		return _baseValue + _buffValue;
	}
}
