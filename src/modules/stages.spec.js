import reducer, {
  stageAdded,
  stageChanged,
  stageDeleted,
  STAGE_ADDED,
  STAGE_CHANGED,
  STAGE_DELETED } from 'modules/stages';

describe('stages module', () => {
  describe('#reducer', () => {
    context('when the action is undefined', () => {
      it('returns the default state', () => {
        expect(reducer(undefined, { type: 'test' })).to.deep.equal([
          {
            stage: '',
            isValid: true,
            isEnabled: true
          }
        ]);
      });
    });

    context('when the action is stage changed', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, stageChanged('{}', 0))).to.deep.equal([
          {
            stage: '{}',
            isValid: true,
            isEnabled: true
          }
        ]);
      });
    });

    context('when the action is stage added', () => {
      it('returns the new state with an additional stage', () => {
        expect(reducer(undefined, stageAdded())).to.deep.equal([
          {
            stage: '',
            isValid: true,
            isEnabled: true
          },
          {
            stage: '',
            isValid: true,
            isEnabled: true
          }
        ]);
      });
    });

    context('when the action is stage deleted', () => {
      it('returns the new state with the deleted stage', () => {
        expect(reducer(undefined, stageDeleted(0))).to.deep.equal([]);
      });
    });
  });

  describe('#stageAdded', () => {
    it('returns the STAGE_ADDED action', () => {
      expect(stageAdded()).to.deep.equal({
        type: STAGE_ADDED
      });
    });
  });

  describe('#stageChanged', () => {
    it('returns the STAGE_CHANGED action', () => {
      expect(stageChanged('{}', 0)).to.deep.equal({
        type: STAGE_CHANGED,
        index: 0,
        stage: '{}'
      });
    });
  });

  describe('#stageDeleted', () => {
    it('returns the STAGE_DELETED action', () => {
      expect(stageDeleted(0)).to.deep.equal({
        type: STAGE_DELETED,
        index: 0
      });
    });
  });
});
