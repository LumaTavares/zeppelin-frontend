import axios from 'axios';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useOrganizationStore } from '@/stores/organization';

const userEmail = ref('');
const organization = ref(null);

export const fetchEmployeeData = async () => {
  try {
    const auth = useAuthStore(); // Obtém o token de autenticação
    userEmail.value = auth.user?.email || ''; // Define o e-mail do usuário

    console.log("userEmail:", userEmail.value); // Loga o valor de userEmail

    const response_funcionario = await axios.get("http://localhost:8000/employee/employee/", {
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      params: {
        limit: 100 // Ajuste o limite conforme necessário
      }
    });

    // Acessa a propriedade `data` dentro do objeto de resposta
    const funcionarios = response_funcionario.data?.data;

    console.log("Lista de funcionários:", funcionarios); // Loga o array completo

    if (Array.isArray(funcionarios)) {
      for (const funcionario of funcionarios) {
        console.log("Verificando funcionário:", funcionario); // Loga cada objeto funcionário
        if (funcionario?.e_mail === userEmail.value) {
          console.log("Funcionário encontrado:", funcionario); // Loga quando uma correspondência é encontrada
          // Retorna o ID do funcionário
          const funcionarioId = funcionario.id;
          console.log("ID do funcionário:", funcionarioId);

          // Atribui os dados da organização à variável reativa
          if (funcionario.employee_organization) {
            organization.value = funcionario.employee_organization;
            const organizationID = useOrganizationStore();
            organizationID.setOrganizationId(organization.value.id);
            console.log("Dados da organização atribuídos:", organization.value);
          } else {
            console.log("Funcionário não possui organização associada.");
          }
          break;
        }
      }
    } else {
      console.error("Erro: response_funcionario.data.data não é um array:", funcionarios);
    }
  } catch (error) {
    console.error("Erro ao buscar funcionário:", error.response || error.message || "Erro desconhecido");
  }
};