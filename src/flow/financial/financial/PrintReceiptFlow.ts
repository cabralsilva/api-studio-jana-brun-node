import * as HttpStatus from 'http-status'
import FlowHttp from '../../../model/FlowHttp'
import HttpError from '../../../model/HttpError'
import StringUtils from "../../../utils/StringUtils"
import Utils from '../../../utils/Utils'
import GetByIdFlowItem from "./item/GetByIdFlowItem"
import ValidatePrintReceiptFlowItem from './item/ValidatePrintReceiptFlowItem'

class PrintReceiptFlow extends FlowHttp {

  async print(req, res) {
    try {

      const financial = await GetByIdFlowItem.get(req.params.id);
      if (Utils.isEmpty(financial)) {
        throw new HttpError(HttpStatus.NOT_FOUND, StringUtils.message("message.registerNotFounded"))
      }
      await ValidatePrintReceiptFlowItem.validate(financial)
      return this.generateReceipt(financial)
    } catch (error) {
      this.processError(error)
    }
  }

  generateReceipt(financial: any) {
    var html = `<html> \
                  <head> \
                    <meta charset='UTF-8'> \
                    <title>Comprovante não fiscal</title> \
                    <style> \
                      body { \
                        -webkit-print-color-adjust: exact !important; \
                        print-color-adjust: exact !important; \
                      } \
                      \
                      thead.header { \
                        background-color: #333; \
                        color: #fff; \
                      } \
                      \
                      .bolder { \
                        font-weight: bolder; \
                      } \
                      \
                      .left { \
                        text-align: left !important; \
                      } \
                      \
                      .right { \
                        text-align: right !important; \
                      } \
                      \
                      .center { \
                        text-align: center; \
                      } \
                      \
                      .parent-width { \
                        width: 100%; \
                      } \
                      \
                      .text-center { \
                        text-align: center; \
                      } \
                      \
                      .top-dashed { \
                        border-top: 1px dashed #BCBCBC; \
                      } \
                      \
                      .uppercase { \
                        text-transform: uppercase; \
                      } \
                      \
                      .printer-ticket {\
                        display: table !important;\
                        width: 100%;\
                        max-width: 400px;\
                        font-weight: light;\
                        line-height: 1.3em;\
                      }\
                      \
                      .printer-ticket,\
                      .printer-ticket * {\
                        font-family: Tahoma, Geneva, sans-serif;\
                        font-size: 10px;\
                      }\
                      \
                      .printer-ticket th {\
                        font-weight: inherit;\
                        padding: 10px 0;\
                        text-align: center;\
                      }\
                      \
                      .padding-left-5 {\
                        padding-left: 5px !important;\
                      }\
                      \
                      .padding-right-5 {\
                        padding-right: 5px !important;\
                      }\
                    </style>\
                  </head>\
                  <body translate='no'>\
                    <table id='receipt' class='printer-ticket'>\
                      <tbody>\
                        <tr>\
                          <td>\
                            <table class='printer-ticket'>\
                              <thead class='header'>\
                                <tr>\
                                  <th>ESTABELECIMENTO</th>\
                                </tr>\
                                <tr>\
                              </thead>\
                              <tbody>\
                                <tr>\
                                  <td class='center'>NOME</td>\
                                </tr>\
                                <tr>\
                                  <td class='center'>rUA, NUMERO, BAIRRO</td>\
                                </tr>\
                                <tr>\
                                  <td class='center'>PHONE}</td>\
                                </tr>\
                                <tr>\
                                  <td class='center'>EMAIL</td>\
                                </tr>\
                              </tbody>\
                            </table>\
                            <table class='printer-ticket'>\
                              <thead class='header'>\
                                <tr>\
                                  <th>DOCUMENTO</th>\
                                </tr>\
                                <tr>\
                              </thead>\
                              <tbody>\
                                <tr>\
                                  <td class='padding-left-5'>Nº Pedido: <span class='bolder'>NUMERO DOCUMENTO</span></td>\
                                </tr>\
                                <tr>\
                                  <td class='padding-left-5'>Data/Hora: <span class='bolder'>01/01/2023</span></td>\
                                </tr>\
                              </tbody>\
                            </table>\
                            <table class='printer-ticket'>\
                              <thead class='header'>\
                                <tr>\
                                  <th>CLIENTE</th>\
                                </tr>\
                                <tr>\
                              </thead>\
                              <tbody>\
                                <tr>\
                                  <td class='padding-left-5'> Nome: <span class='bolder'>cUSTOMER NAME</span> </td>\
                                </tr>\
                                <tr>\
                                  <td class='padding-left-5'> Contato: <span class='bolder'>FONE / EMAIL</span>\
                                  </td>\
                                </tr>\
                              </tbody>\
                            </table>\
                            <table class='printer-ticket'>\
                              <thead class='header'>\
                                <tr>\
                                  <th>ITENS</th>\
                                </tr>\
                                <tr>\
                              </thead>\
                              <tbody>\
                                <tr>\
                                  <td>\
                                    <table class='parent-width'>\
                                      <thead class='bolder'>\
                                        <tr>\
                                          <th class='left padding-left-5'>Descrição</th>\
                                          <th class='left'>Qtde</th>\
                                          <th class='left'>Preço</th>\
                                          <th class='padding-right-5 right'>Total</th>\
                                        </tr>\
                                      </thead>\
                                      <tbody>
                                      <tr>\
                                        <td class='left padding-left-5'>item 1</td>\
                                        <td class='left'>2</td>\
                                        <td class='left'>25,00</td>\
                                        <td class='padding-right-5 right'>50,00</td>\
                                      </tr>\
                                      </tbody>\
                                      <tfoot>\
                                        <tr>\
                                          <td class='top-dashed padding-left-5' colspan='3'>Subtotal</td>\
                                          <td class='padding-right-5 top-dashed right'>50,00</td>\
                                        </tr>\
                                        <tr>\
                                          <td class='padding-left-5' colspan='3'>Descontos</td>\
                                          <td class='padding-right-5 right'>0,00</td>\
                                        </tr>\
                                        <tr>\
                                          <td class='padding-left-5' colspan='3'>Total</td>\
                                          <td class='padding-right-5 bolder right'>50,00</td>\
                                        </tr>\
                                      </tfoot>\
                                    </table>\
                                  </td>\
                                </tr>\
                              </tbody>\
                            </table>\
                            <table class='printer-ticket'>\
                              <thead class='header'>\
                                <tr>\
                                  <th>PAGAMENTO</th>\
                                </tr>\
                                <tr>\
                              </thead>\
                              <tbody>\
                                <tr>\
                                  <td class='padding-left-5'> Forma de pagamento: <span class='bolder'>DINHEIRO 1x</span> </td>\
                                </tr>\
                              </tbody>\
                            </table>\
                            <table class='printer-ticket'>\
                              <thead>\
                                <tr>\
                                  <th class='top-dashed'>COMPROVANTE NÃO FISCAL</th>\
                                </tr>\
                              </thead>\
                            </table>\
                          </td>\
                        </tr>\
                      </tbody>\
                    </table>\
                  </body>\
                </html>`
    return html
  }
}
export default new PrintReceiptFlow