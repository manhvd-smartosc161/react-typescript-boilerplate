import { FC, ReactNode } from 'react';
import { Modal, Form, FormProps, ModalProps } from 'antd';
import { StyledFormModal } from './index.styled';
import ActionButton from '../ActionButton';

interface FormModalProps extends Omit<ModalProps, 'onOk' | 'onCancel'> {
  formProps?: FormProps;
  onSubmit?: (values: any) => void | Promise<void>;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  submitLoading?: boolean;
  children: ReactNode;
}

const FormModal: FC<FormModalProps> = ({
  formProps,
  onSubmit,
  onCancel,
  submitText = 'Submit',
  cancelText = 'Cancel',
  submitLoading = false,
  children,
  ...modalProps
}) => {
  const [form] = Form.useForm(formProps?.form);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit?.(values);
    } catch (error) {
      // Form validation failed
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel?.();
  };

  return (
    <StyledFormModal>
      <Modal
        {...modalProps}
        onCancel={handleCancel}
        footer={[
          <ActionButton key="cancel" variant="secondary" onClick={handleCancel}>
            {cancelText}
          </ActionButton>,
          <ActionButton
            key="submit"
            variant="primary"
            loading={submitLoading}
            onClick={handleSubmit}
          >
            {submitText}
          </ActionButton>,
        ]}
      >
        <Form {...formProps} form={form} layout="vertical" requiredMark={false}>
          {children}
        </Form>
      </Modal>
    </StyledFormModal>
  );
};

export default FormModal;
