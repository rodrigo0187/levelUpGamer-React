import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import EditarPerfil from '../pages/EditarPerfil';
import React from 'react';

describe('Pruebas de pagnina EditarPerfil.tsx', () => {
    test('Snapshot de la pagina EditarPerfil',()=>{
        const {container} = render(<EditarPerfil/>);
        expect(container).toMatchSnapshot();
    })
})