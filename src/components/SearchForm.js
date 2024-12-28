import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SearchSchema = Yup.object().shape({
  searchTerm: Yup.string()
    .min(2, 'Arama terimi çok kısa!')
    .max(50, 'Arama terimi çok uzun!')
    .required('Arama terimi gerekli'),
});

export default function SearchForm({ onSearch, isLoading }) {
  return (
    <Formik
      initialValues={{ searchTerm: '' }}
      validationSchema={SearchSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSearch(values.searchTerm);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-full max-w-sm">
          <div className="flex">
            <Field
              type="text"
              name="searchTerm"
              placeholder="Haberlerde ara..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              disabled={isLoading || isSubmitting}
            />
            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500/70 dark:hover:bg-blue-600/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              aria-label="Ara"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          {errors.searchTerm && touched.searchTerm && (
            <div className="absolute mt-1 text-red-500 text-xs">{errors.searchTerm}</div>
          )}
        </Form>
      )}
    </Formik>
  );
} 