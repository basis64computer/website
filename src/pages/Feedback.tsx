import { useState } from "react";

import { Input, Button, Modal, Spinner } from "../components/ui/";
import useInput from "../hooks/useInput";


export default function Feedback() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  // const [name, setName] = useState("");
  const [name, onNameChange] = useInput("");

  const submitHandler = async () => {
    setIsLoading(true);


    // fetch()

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    setIsDone(true);
  }

  // if (isLoading) {
  //   return <div>Loading</div>
  // }

  return (
    <div className="container p-4 mx-auto">
      <div className="">
        <Modal
          open={isLoading}
          title="Mengirim"
          variant="loading"
        >
          <div className="flex items-center gap-3">
            <Spinner size={32} className="" />
            <span>Mengirim feedback...</span>
          </div>
        </Modal>
        <Modal
          open={isDone}
          title="Informasi"
          variant="success"
          onConfirm={() => setIsDone(false)}
          onCancel={() => setIsDone(false)}
          confirmText="Tutup"

        >
          <p>Pesan terkirim.</p>
        </Modal>
        <Modal
          open={isFailed}
          title="Mengirim"
          variant="error"
          onConfirm={() => setIsFailed(false)}
          onCancel={() => setIsFailed(false)}
        >
          <div className="flex items-center gap-3">
            <Spinner size={32} className="" />
            <span>Mengirim feedback...</span>
          </div>
        </Modal>
      </div>
      <div className="block p-6 mb-4 bg-white border border-gray-200 shadow-xs dark:bg-neutral-800 dark:border-gray-700 text-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" data-i18n="pages.feedback.contentTitle">Berikan Kami Feedback</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400" data-i18n="pages.feedback.contentDescription">Kami sangat menghargai masukan dan saran kamu dan beritahu kami jika terdapat bug pada website ini.</p>
        <blockquote className="text-md italic text-gray-500 dark:text-white">
          <p>"Your constructive opinion woulnd't go to /dev/null"</p>
        </blockquote>
      </div>
      <div className="p-4 relative z-10 bg-white border border-gray-200 md:p-10 dark:bg-neutral-900 dark:border-neutral-700 shadow-xs">
        <div className="mb-4 sm:mb-8">
          <Input
            id="inputName"
            label="Nama"
            value={name}
            placeholder="Nama kamu"
            required
            onChange={onNameChange}
            dataI18n="pages.feedback.name"
            dataI18nPlaceholder="pages.feedback.name"
          />
        </div>
        <div>
          <label htmlFor="hs-feedback-post-comment-textarea-1" className="block mb-2 text-sm font-medium dark:text-white" data-i18n="pages.feedback.message">Pesan</label>
          <div className="mt-1">
            <textarea id="inputMessage" name="hs-feedback-post-comment-textarea-1" rows={3} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik pesan kamu di sini..." data-i18n-placeholder="pages.feedback.messagePlaceholder"></textarea>
          </div>
        </div>
        <div className="mt-6 grid">
          <Button onClick={() => submitHandler()} variant="blue" type="submit">Kirim</Button>


        </div>
      </div>
    </div>
  );
}
