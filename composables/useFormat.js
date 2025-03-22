export const useFormat = () => {
  const formatText = (text) => {
    if (text === 'hight') return 'Alto Risco';
    if (text === 'medium') return 'Médio Risco';
    if (text === 'low') return 'Baixo Risco';
    return text;
  };

  const formatCurrency = (value) => {
    if (value === undefined || value === null) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatNumber = (value) => {
    if (value === undefined || value === null) return '';
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const formatType = (params) => {
    return params === 'posfixado' ? 'Pós-fixado' : 'Pré-fixado';
  };

  const formatDate = (date) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    const year = String(parsedDate.getFullYear()).slice(-2);
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    return `${month}/${year}`;
  };

  return { formatText, formatCurrency, formatNumber, formatType, formatDate };
};
