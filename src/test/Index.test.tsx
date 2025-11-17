import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import Index from '../pages/index';
import React from 'react';

describe('Pruebas de pagnina Index.tsx', () => {
    test('Snapshot de la pagina Index',()=>{
        const {container} = render(<Index/>);
        expect(container).toMatchSnapshot();
    })
})