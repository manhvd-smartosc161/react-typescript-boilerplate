/**
 * Utility functions for handling form validation errors and scrolling to error fields
 */

/**
 * Expands parent accordion (CollapsibleCard) if collapsed and scrolls to element
 * @param element - The HTML element to scroll to
 * @param delay - Delay in milliseconds before scrolling (default: 0)
 * @returns true if accordion was expanded, false otherwise
 */
export const expandAccordionAndScroll = (
  element: HTMLElement,
  delay: number = 0,
): boolean => {
  const accordion = element.closest('.MuiAccordion-root') as HTMLElement;
  if (accordion) {
    const isExpanded = accordion.classList.contains('Mui-expanded');
    if (!isExpanded) {
      const accordionSummary = accordion.querySelector(
        '.MuiAccordionSummary-root',
      ) as HTMLElement;
      if (accordionSummary) {
        accordionSummary.click();
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 350);
        return true;
      }
    }
  }
  setTimeout(() => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, delay);
  return false;
};

/**
 * Scrolls to the first error field in the form
 * Uses multiple strategies to find the error field in the DOM
 * @param fieldName - The field name path (e.g., "information.addresses[1].line1")
 */
export const scrollToFirstError = (fieldName: string): void => {
  // Wait a bit for the DOM to update after setFocus
  setTimeout(() => {
    // Convert field name format from "information.addresses[1].line1" to various formats
    const normalizedName = fieldName.replace(/\[(\d+)\]/g, '.$1');
    const nameVariants = [
      fieldName, // Original: information.addresses[1].line1
      normalizedName, // information.addresses.1.line1
      fieldName.replace(/\[/g, '.').replace(/\]/g, ''), // information.addresses.1.line1 (alternative)
      fieldName.replace(/\./g, '\\.'), // Escaped for regex
    ];

    // Strategy 1: Find by id attribute (field.name is used as id)
    for (const name of nameVariants) {
      const elementById = document.getElementById(name) as HTMLElement;
      if (elementById) {
        expandAccordionAndScroll(elementById);
        return;
      }
    }

    // Strategy 2: Find by name attribute
    for (const name of nameVariants) {
      const elementByName = document.querySelector(
        `[name="${name}"]`,
      ) as HTMLElement;
      if (elementByName) {
        expandAccordionAndScroll(elementByName);
        return;
      }
    }

    // Strategy 3: Find FormControl with error that contains this field
    // Look for FormControl with Mui-error class that has a child input/select with matching name pattern
    const formControls = document.querySelectorAll(
      '.MuiFormControl-root.Mui-error',
    );
    for (const formControl of Array.from(formControls)) {
      const input = formControl.querySelector(
        'input, select, textarea',
      ) as HTMLElement;
      if (input) {
        const inputName = input.getAttribute('name') || input.id;
        // Check if this field matches our target (fuzzy match for array indices)
        const fieldNamePattern = fieldName.replace(/\[\d+\]/g, '\\[\\d+\\]');
        const regex = new RegExp(fieldNamePattern.replace(/\./g, '\\.'));
        if (inputName && regex.test(inputName)) {
          expandAccordionAndScroll(formControl as HTMLElement);
          return;
        }
      }
    }

    // Strategy 4: Find FormHelperText with error message (most reliable for visible errors)
    const errorHelperTexts = document.querySelectorAll(
      '.MuiFormHelperText-root.Mui-error',
    );
    if (errorHelperTexts.length > 0) {
      // Find the first one that's in a FormControl with matching field
      for (const helperText of Array.from(errorHelperTexts)) {
        const formControl = helperText.closest(
          '.MuiFormControl-root',
        ) as HTMLElement;
        if (formControl) {
          const input = formControl.querySelector(
            'input, select, textarea',
          ) as HTMLElement;
          if (input) {
            const inputName = input.getAttribute('name') || input.id;
            // Check if field name matches (handle array indices flexibly)
            const baseFieldName = fieldName.split('[')[0]; // Get base before first [
            if (inputName && inputName.startsWith(baseFieldName)) {
              expandAccordionAndScroll(formControl);
              return;
            }
          }
        }
      }
      // If no match found, just scroll to first error helper text
      const firstError = errorHelperTexts[0] as HTMLElement;
      const formControl = firstError.closest(
        '.MuiFormControl-root',
      ) as HTMLElement;
      if (formControl) {
        expandAccordionAndScroll(formControl);
        return;
      }
    }

    // Strategy 5: Fallback - find any element with error class
    const errorElement = document.querySelector(
      '.Mui-error:not(.MuiFormHelperText-root), [aria-invalid="true"]',
    ) as HTMLElement;
    if (errorElement) {
      expandAccordionAndScroll(errorElement);
    }
  }, 200);
};

/**
 * Recursively finds the first error field in a nested error object
 * @param errors - The error object from react-hook-form
 * @param prefix - The prefix path for nested fields (default: '')
 * @returns The field path of the first error, or null if no error found
 */
export const findFirstErrorField = (
  errors: any,
  prefix: string = '',
): string | null => {
  if (!errors || typeof errors !== 'object') {
    return null;
  }

  // Check for nested array errors (addresses, payments, contacts, sites)
  if (Array.isArray(errors)) {
    for (let i = 0; i < errors.length; i++) {
      const itemError = errors[i];
      if (itemError) {
        const nestedField = findFirstErrorField(itemError, `${prefix}[${i}]`);
        if (nestedField) {
          return nestedField;
        }
      }
    }
    return null;
  }

  // Check for direct field errors
  const fieldKeys = Object.keys(errors).filter(
    (key) => key !== 'addresses' && key !== 'payments' && key !== 'contacts',
  );

  for (const key of fieldKeys) {
    const error = errors[key];
    if (error) {
      const fieldName = prefix ? `${prefix}.${key}` : key;
      // If it's a simple error (has message), return it
      if (error.message) {
        return fieldName;
      }
      // If it's a nested object, recurse
      const nestedField = findFirstErrorField(error, fieldName);
      if (nestedField) {
        return nestedField;
      }
    }
  }

  // Check nested objects (addresses, payments, contacts)
  const nestedKeys = ['addresses', 'payments', 'contacts'];
  for (const key of nestedKeys) {
    const nestedError = errors[key];
    if (nestedError) {
      if (nestedError.message) {
        // Array-level error
        return prefix ? `${prefix}.${key}` : key;
      }
      if (Array.isArray(nestedError)) {
        for (let i = 0; i < nestedError.length; i++) {
          const itemError = nestedError[i];
          if (itemError) {
            const fieldName = prefix
              ? `${prefix}.${key}[${i}]`
              : `${key}[${i}]`;
            const nestedField = findFirstErrorField(itemError, fieldName);
            if (nestedField) {
              return nestedField;
            }
          }
        }
      }
    }
  }

  return null;
};
