import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../../Styles/colors';

const {width} = Dimensions.get('window');
const buttonWidth = (width - 90) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    paddingTop: '25%',
    paddingBottom: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: Colors.blue,
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  actGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  actButton: {
    width: buttonWidth,
    height: 80,
    backgroundColor: Colors.lightBlue,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  actCount: {
    fontSize: 12,
    color: '#E6F3FF',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  detailsHeader: {
    paddingTop: '10%',
    paddingBottom: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginLeft: -40,
  },
  detailsContent: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  ruleCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  ruleProvision: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    lineHeight: 22,
  },
  ruleDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ruleInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ruleFine: {
    fontSize: 14,
    color: '#E74C3C',
    fontWeight: '600',
    marginBottom: 4,
  },
  rulePoints: {
    fontSize: 14,
    color: '#F39C12',
    fontWeight: '500',
  },
  ruleBadge: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignItems: 'center',
  },
  ruleBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noRulesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  noRulesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  noRulesSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default styles;
