const cliente = {
    nombre: "Tomas Garnero 2",
    balance: 500,
    tipo: "Premium"
};

describe("Testing al cliente", () => {

    test("Es Tomas Garnero", () => {
        expect(cliente).toMatchSnapshot();
    });

});