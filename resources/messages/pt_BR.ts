export default {
  message: {
    test: "Test",
    brand: "Marca",
    category: "Categoria",
    paymentCondition: "Condição de pagamento",
    price: "Preço",
    priceTable: "Tabela de preço",
    methodNotImplemented: "Funcionalidade não implementada. {0}",
    http: {
      invalidRequest: "Requisição inválida",
      invalidCredentials: "Usuário e/ou senha inválidos",
      invalidToken: "Token inválido",
      expiredToken: "Token expirado",
      updatePasswordInvalid: "Não foi possível alterar a senha atual. Verifique as credenciais informadas!"
    },
    financial:{
      openValueLessThan: "Valor em aberto é menor que o valor informado ou já esta quitado!",
      printReceiptPaymentsStatusIllegal: "Só é possível imprimir título pagos ou parcialmente pagos."
    },
    response:{
      resourceNotFound: "{0} não encontrado.",
      matriculation: {
        financialAlreadyCreated: "Registros financeiros já foram gerados anteriorment. {0}"
      }
    },
    enum: {
      typeOfPayroll: {
        REGULAR: "Regular",
        VARIABLE: "Variável"
      }
    }
  }
}