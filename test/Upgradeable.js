// 1. delete build folder
// 2. run truffle develop: truffle develop
// 3. run this test: test

const ScoreV1 = artifacts.require('ScoreV1');
const ScoreV2 = artifacts.require('ScoreV2');
const Proxy = artifacts.require('Proxy');

contract('Upgradeable', accounts => {
    it('should work', async () => {

        // Proxy 및 score_v1, score_v2 컨트랙 발행
        const proxy = await Proxy.deployed();
        const score_v1 = await ScoreV1.deployed();
        const score_v2 = await ScoreV2.deployed();

        // score_v1 컨트랙 주소를 Proxy에 등록
        await proxy.setImplementation(score_v1.address);

        // proxy 컨트랙트를 score_v1 컨트랙트의 ABI를 사용해 접근
        const proxyScoreV1 = await ScoreV1.at(proxy.address);

        // Score 인자값으로 10을 전달.
        // > ScoreStorage의 Score가 10으로 변경된다.
        await proxyScoreV1.setScore(10);

        // ScoreV1의 score 점수 출력
        const getScoreV1 = await proxyScoreV1.score();
        console.log('Score of ScoreV1 contract is', getScoreV1.toNumber());

        // Proxy의 score_v1 주소를 score_v2로 변경
        await proxy.setImplementation(score_v2.address);

        // proxy 컨트랙트를 score_v2 컨트랙트의 ABI를 사용해 접근
        const proxyScoreV2 = await ScoreV2.at(proxy.address);

        // Score 인자값으로 10을 전달.
        // V1에 의해 이미 ScoreStorage의 score 값이 10이 되었으므로
        // V2의 score += _score + 1 동작에 따라, 10이 전달될 시, ScoreStorage의 score 값은 21이 된다.
        await proxyScoreV2.setScore(10);

        // ScoreV2의 score 점수 출력
        const getScoreV2 = await proxyScoreV2.score();
        console.log('Score of ScoreV2 contract is', getScoreV2.toNumber());

        return;
    });
});
