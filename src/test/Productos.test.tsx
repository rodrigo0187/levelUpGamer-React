import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import Productos from '../pages/Productos';
import React from 'react';

describe('Pruebas de pagnina Productos.tsx', () => {
    test('Snapshot de la pagina Productos',()=>{
        const {container} = render(<Productos/>);
        expect(container).toMatchSnapshot();
    })
});

