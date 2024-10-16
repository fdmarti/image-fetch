export const useFetchImage = () => {
    const url = ref<string>(
        'https://mortgage-repayment-calculator-main.vercel.app/',
    );

    const isLoading = ref<boolean>(false);

    const { dowloadImages } = useUseDownolad();

    const handleSubmitForm = async () => {
        isLoading.value = true;
        await $fetch('/api/search-images', {
            method: 'POST',
            body: {
                url: url.value,
            },
        }).then(async (data) => {
            const result = await dowloadImages(data, url.value);

            if (result?.path) {
                const a = document.createElement('a');
                a.setAttribute('href', 'data:text/plain;base64,' + data);
                console.log(result.path);
                a.setAttribute('download', result.path);

                a.style.display = 'none';
                document.body.appendChild(a);

                a.click();

                document.body.removeChild(a);
            }

            console.log(result);
            setTimeout(() => {
                isLoading.value = false;
                // url.value = '';
            }, 0);
        });
    };

    return {
        isLoading,
        url,

        handleSubmitForm,
    };
};
