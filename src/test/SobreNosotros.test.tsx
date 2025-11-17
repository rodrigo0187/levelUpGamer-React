import {describe, expect, test} from 'vitest';  
import {render, screen} from '@testing-library/react';
import SobreNosotros from '../pages/SobreNosotros';  
import React from 'react';

describe('Pruebas de pagnina SobreNosotros.tsx', () => {
    test('Snapshot de la pagina SobreNosotros',()=>{
        const {container} = render(<SobreNosotros/>);
        expect(container).toMatchSnapshot();
    })
})