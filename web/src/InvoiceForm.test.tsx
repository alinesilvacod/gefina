import {
     describe, 
     it,
     expect,
     vi
     } from 'vitest';

     import {
         render,
         screen 
      } from '@testing-library/react';

     import InvoiceForm from './invoiceForm.tsx';

     import user from '@testing-library/user-event';
import { use } from 'react';


describe(
    'InvoiceForm',
    () => {
        it (
            'apresenta os campos com rótulo associado',
            () => {
                render(<InvoiceForm
                invoice={null}
                customers={[{
                    id:1,
                    name:'cliente de teste',
                    email:'teste@gefina.com.br'
                }]}
                error={null}
                fieldErrors={{}}
                onDelete={() => {}}
                confirmDelete={false}
                setConfirmDelete={() => {}}
                confirm={() => {}}
                onCancel={() => {}}
                onSumit={() => {}}
                busy={false}
                />);

                expect(screen.getAllByLabelText('Cliente')).toBeDefined();
                expect(screen.getAllByLabelText('Valor')).toBeDefined();
                expect(screen.getAllByLabelText('Situação')).toBeDefined();
                expect(screen.getAllByLabelText('Emissão')).toBeDefined();
                expect(screen.getAllByLabelText('Vencimento')).toBeDefined();
            }
        );

        it (
            'entrega os valores convertidos no envio',
            async () => {
                const onSumit = vi.fn();
                 render(<InvoiceForm
                invoice={null}
                customers={[{
                    id:1,
                    name:'cliente de teste',
                    email:'teste@gefina.com.br'
                }]}
                error={null}
                fieldErrors={{}}
                onDelete={() => {}}
                confirmDelete={false}
                setConfirmDelete={() => {}}
                confirm={() => {}}
                onCancel={() => {}}
                onSumit={onSumit}
                busy={false}
                />);
                await user.selectOptions(screen.getByLabelText('Cliente'), '1');
                await user.type(screen.getByLabelText('Valor'), '1250.37');
                await user.selectOptions(screen.getByLabelText('Situação'), 'pending');
                await user.type(screen.getByLabelText('Emissão'), '2026-11-01');
                await user.type(screen.getByLabelText('Vencimento'), '2026-11-30');
                await user.click(screen.getByRole('button', { name: 'Salvar'}));

                expect (onSumit).toHaveBeenCalledWith({
                    customerId: 1,
                    amount:125037,
                    status:'pending',
                    issueDate:'2026-11-01',
                    dueDate:'2026-11-30'
                });
           }
        );
    }
);