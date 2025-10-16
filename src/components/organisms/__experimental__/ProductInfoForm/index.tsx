import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Box, Button, FormHelperText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductLineEntry from '@src/components/organisms/ProductLineEntry';
import { FormSectionLayout } from '@src/components/molecules';

const MAX_ENTRIES = 5;

const ProductInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const name = 'productInfo.productLines';

  const { fields, append, remove } = useFieldArray({ control, name });

  const handleAddLine = () => {
    if (fields.length < MAX_ENTRIES) {
      append({
        soldAt: { makro: false, lotus: false },
        brandNameTh: '',
        brandNameEn: '',
        productCategory: '',
        productSubcategory: '',
        skuCount: undefined,
        offerExclusivity: undefined,
        targetCustomerType: '',
        availableChannels: [],
        usp: '',
        currentlySoldIn: '',
        images: {
          packagingFront: null,
          packagingBehind: null,
          packagingSide: null,
          otherAspects: null,
        },
      });
    }
  };

  const productLinesError = (errors.productInfo as any)?.productLines as any;

  return (
    <FormSectionLayout title={'Product Details'} subtitle="General Information">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {fields.map((field, index) => (
          <ProductLineEntry
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
            canRemove={fields.length > 1}
          />
        ))}
      </Box>

      {productLinesError && !productLinesError.type && (
        <FormHelperText error sx={{ mt: 2 }}>
          {productLinesError.message}
        </FormHelperText>
      )}

      <Button
        startIcon={<AddIcon />}
        onClick={handleAddLine}
        disabled={fields.length >= MAX_ENTRIES}
        variant="text"
        sx={{ mt: 3 }}
      >
        Add Product Range
      </Button>
    </FormSectionLayout>
  );
};

export default ProductInfoForm;
