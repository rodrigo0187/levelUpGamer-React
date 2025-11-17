import { describe, expect,test } from "vitest";
import { render, screen } from "@testing-library/react";
import Blog from "../pages/Blog";
import React from "react";

describe('Pruebas de pagnina Blog.tsx', () => {
    test('Snapshot de la pagina Blog',()=>{
        const {container} = render(<Blog/>);
        expect(container).toMatchSnapshot();
    })
})