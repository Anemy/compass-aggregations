import importPipeline from 'modules/import-pipeline';

describe('import pipeline module', () => {
  describe('#importPipeline', () => {
    context('when the pipeline is a valid single stage', () => {
      const text = '[{ $match: { name: "testing" }}]';
      let pipeline;

      before(() => {
        pipeline = importPipeline(text)[0];
      });

      it('generates an id', () => {
        expect(pipeline.id).to.not.equal(null);
      });

      it('sets the correct stage operator', () => {
        expect(pipeline.stageOperator).to.equal('$match');
      });

      it('sets the stage', () => {
        expect(pipeline.stage).to.equal('{\n  name: \'testing\'\n}');
      });

      it('sets if the pipeline is valid', () => {
        expect(pipeline.isValid).to.equal(true);
      });

      it('sets is expanded to true', () => {
        expect(pipeline.isExpanded).to.equal(true);
      });

      it('sets is loading to false', () => {
        expect(pipeline.isLoading).to.equal(false);
      });

      it('sets is complete to false', () => {
        expect(pipeline.isComplete).to.equal(false);
      });

      it('sets the empty preview documents', () => {
        expect(pipeline.previewDocuments).to.deep.equal([]);
      });

      it('sets the syntax error', () => {
        expect(pipeline.syntaxError).to.equal(null);
      });

      it('sets the error to null', () => {
        expect(pipeline.syntaxError).to.equal(null);
      });
    });
  });
});