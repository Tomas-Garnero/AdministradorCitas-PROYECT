const cliente = {
    nombre: "Tomas Garnero",
    balance: 500
};

describe("Testing al Cliente", () => {

    test("El cliente es Premium?", () => {
        expect(cliente.balance).toBeGreaterThan(400);
    });

    test("El cliente es Tomas Garnero?", () => {
        expect(cliente.nombre).toBe("Tomas Garnero");
    });

    test("No es otro cliente", () => {
        expect(cliente.nombre).not.toBe("Felipe Garnero");
    });

    test("No tiene 500", () => {
        expect(cliente.balance).not.toBe(400);
    });
});