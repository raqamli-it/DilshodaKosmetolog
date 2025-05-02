import jsPDF from 'jspdf';

import autoTable from "jspdf-autotable";
import { FileText } from 'lucide-react';
export default function PdfDw({ apiData }) {

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Bemorlar Ro‘yxati', 14, 16);

    const tableColumn = ['ID', 'Ism', 'Viloyat', 'Kasallik Turi', 'Telefon raqam', 'Status'];
    const tableRows = [];

    apiData.forEach((item, i) => {
      const row = [
        i + 1,
        item.full_name,
        item.region.name || 'Noma\'lum',
        item.type_disease?.name || 'Noma\'lum',
        item.phone_number || '',
        item.status === "debtor" ? "qarzdor" : item.status === "treated" ? "davolangan" : "to'langan",
      ];
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('bemorlar.pdf');
  };
  return (
    <button
      disabled={!apiData.length} // Agar ma'lumotlar bo'sh bo'lsa, tugmani o'chirish
      onClick={generatePDF}
      className={`flex gap-1 px-4 py-2 bg-[orange] text-white rounded hover:bg-orange-500 ${!apiData.length ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <FileText size={20} className="" /> jadvalni yuklash
    </button>
  )
}
