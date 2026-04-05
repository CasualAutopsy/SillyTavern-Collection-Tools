import {sample, sampleSize, shuffle} from 'lodash-es';
import {toSafeInteger} from 'lodash-es';

import {isVarCheck} from '../../../../utils.js';


export async function collectionSampleCMD(args, target) {
    return sample(
        isVarCheck(target, args)
    );
}

export async function collectionSampleSizeCMD(args, [target, n]) {
    return sampleSize(
        isVarCheck(target, args),
        toSafeInteger(n)
    );
}

export async function collectionShuffleCMD(args, target) {
    return shuffle(
        isVarCheck(target, args)
    );
}
